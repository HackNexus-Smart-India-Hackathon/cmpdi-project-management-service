import Project from "../models/project.js";
import User from "../models/User.js";
import { generateProjectCode } from "../utils/codeGenerator.js";
import {
  sendInvitationEmail,
  sendRegistrationLink,
} from "../utils/emailSender.js";
import argon2 from "argon2";
import { stringify, v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Op } from "sequelize";

async function encryptPassword(password) {
  try {
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
}

export const createProject = async (req, res) => {
  try {
    const {
      projectTitle,
      fundingSource,
      description,
      principalImplementingAgency,
      subImplementingAgencies,
      projectInvestigators,
      startDate,
      scheduleCompletionDate,
      projectOutlay,
      status,
      adminId,
    } = req.body;
    if (
      !fundingSource ||
      !projectTitle ||
      !principalImplementingAgency ||
      !projectInvestigators ||
      !startDate ||
      !scheduleCompletionDate ||
      !projectOutlay ||
      !status ||
      !adminId
    ) {
      console.log(req.body);
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const projectCode = await generateProjectCode(fundingSource);

    const transaction = await Project.sequelize.transaction();
    // let adminName = null;
    let adminEmail1 = null;
    try {
      const adminUser = await User.findOne(
        { where: { id: adminId } },
        { transaction }
      );
      if (!adminUser) {
        return res.status(404).json({
          success: false,
          message: "Admin user not found",
        });
      }
      // adminName = adminUser.username;
      adminEmail1 = adminUser.email;

      const adminEmail = adminUser.email;
      // console.log("adminEmail", adminEmail);
      // console.log("projectInvestigators", projectInvestigators);

      const project = await Project.create(
        {
          projectCode,
          projectTitle,
          fundingSource,
          description,
          principalImplementingAgency,
          subImplementingAgencies,
          startDate,
          scheduleCompletionDate,
          projectOutlay,
          status,
          adminEmail,
          projectInvestigatorEmail: projectInvestigators,
        },
        { transaction }
      );
      console.log("project", project);

      if (projectInvestigators && Array.isArray(projectInvestigators)) {
        for (const email of projectInvestigators) {
          if (!email) {
            throw new Error("Investigator email is required");
          }
          let user = await User.findOne({ where: { email } });

          if (user) {
            // await sendInvitationEmail(email, project.projectTitle);
          } else {
            const registrationLink = `https://your-portal.com/register?ref=${uuidv4()}`;
            await sendRegistrationLink(email, registrationLink);
            const hashedPassword = await encryptPassword("123456");
            user = await User.create(
              {
                email,
                username: email,
                password_hash: hashedPassword,
                role: "investigator",
              },
              { transaction }
            );
          }

          projectInvestigators.forEach((email) => {
            const username = email.split("@")[0];
            axios
              .post(`${process.env.CHAT_ROUTE}/createUser`, {
                username,
                email,
                role: "INVESTIGATOR",
                projectId: String(project.id),
              })
              .then((created) => {
                if (created == "User created successfully")
                  console.log("Chat created");
              })
              .catch((error) => {
                console.error(error);
              });
          });
        }
        axios
            .post(`${process.env.CHAT_ROUTE}/addAdmin`, {
              email: adminEmail1,
              username: adminUser.username,
              role: "ADMIN",
              projectId: String(project.id),
            })
            .then((created) => {
                console.log("Chat created");
            })
            .catch((error) => {
              console.error(error);
            });
        for (let i = 0; i < projectInvestigators.length; i++) {
          let investigator = projectInvestigators[i];
          for (let j = 0; j < projectInvestigators.length; j++) {
            if (j != i) {
              const username = investigator.split("@")[0];
              axios
                .post(`${process.env.CHAT_ROUTE}/privateChat`, {
                  name: username,
                  email: investigator,
                  role: "INVESTIGATOR",
                  projectId: String(project.id),
                  to: investigator[j],
                })
                .then((created) => {
                  if (created == "private chat established")
                    console.log("Chat created");
                  console.log(created);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }
        }
      }

      await project.save({ transaction });

      await transaction.commit();

      res.status(201).json({
        success: true,
        message: "Project created successfully",
        projectId: project.id,
        projectCode,
        adminEmail,
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.log(error);
    console.error("Error in createProject:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the project",
      details: error.message,
    });
  }
};

export const getProjectsByAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;

    if (!adminId) {
      return res
        .status(400)
        .json({ success: false, message: "Admin ID is required" });
    }

    const adminUser = await User.findByPk(adminId);
    if (!adminUser) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const adminEmail = adminUser.email;

    const projects = await Project.findAll({
      where: {
        adminEmail: adminEmail,
      },
    });

    if (projects.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No projects found for this admin" });
    }

    res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      projects: projects,
    });
  } catch (error) {
    console.error("Error in getProjectsByAdmin:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving projects",
      details: error.message,
    });
  }
};

export const getInvestigatorsByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findByPk(projectId);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const investigatorEmails = project.projectInvestigatorEmail;

    const investigators = await User.findAll({
      where: {
        email: {
          [Op.in]: investigatorEmails,
        },
      },
    });

    if (investigators.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No investigators found for this project",
      });
    }

    res.status(200).json({
      success: true,
      message: "Investigators retrieved successfully",
      investigators,
    });
  } catch (error) {
    console.error("Error in getInvestigatorsByProjectId:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving investigators",
      details: error.message,
    });
  }
};

export const getProjectsByInvestigatorEmail = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "'email' is required to fetch the projects.",
    });
  }

  try {
    const projects = await Project.findAll({
      where: {
        projectInvestigatorEmail: {
          [Op.contains]: [email],
        },
      },
    });

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No projects found for investigator email: ${email}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error(
      "Error fetching projects by investigator email:",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the projects",
      error: error.message,
    });
  }
};
export const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
    }

    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project retrieved successfully",
      project,
    });
  } catch (error) {
    console.error("Error in getProjectById:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the project",
      details: error.message,
    });
  }
};