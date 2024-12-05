import Project from "../models/project.js";
import User from "../models/User.js";
import ProjectInvestigators from "../models/ProjectInvestigators.js";
import { generateProjectCode } from "../utils/codeGenerator.js";
import {
  sendInvitationEmail,
  sendRegistrationLink,
} from "../utils/emailSender.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Op } from "sequelize";

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
      !adminName ||
      !adminEmail ||
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
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const projectCode = await generateProjectCode(fundingSource);

    const transaction = await Project.sequelize.transaction();
    let adminName = null;
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
      adminName = adminUser.username;
      adminEmail1 = adminUser.email;

      const adminEmail = adminUser.email;
      console.log("adminEmail", adminEmail);
      console.log("projectInvestigators", projectInvestigators);

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
            const hashedPassword = await bcrypt.hash(uuidv4(), 10);
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

          await ProjectInvestigators.create(
            {
              projectId: project.id,
              userId: user.id,
            },
            { transaction }
          );
          projectInvestigators.forEach(({ email }) => {
            axios
              .post("http://localhost:8000/createUser", {
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
          axios
            .post("http://localhost:8000/createUser", {
              username: adminName,
              email: adminEmail1,
              role: "ADMIN",
              projectId: String(project.id),
            })
            .then((created) => {
              if (created == "User created successfully")
                console.log("Chat created");
            })
            .catch((error) => {
              console.error(error);
            });
        }
        for (let i = 0; i < projectInvestigators.length; i++) {
          let investigator = ProjectInvestigators[i];
          for (let j = 0; j < array.length; j++) {
            if (j != i) {
              axios
                .post("localhost:8000/privateChat", {
                  username: investigator.username,
                  email: investigator.email,
                  role: investigator.role,
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
