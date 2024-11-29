import Project from "../models/project.js";
import { generateProjectCode } from "../utils/codeGenerator";
import { sendInvitationEmail } from "../utils/emailSender";
import User from "../models/User.js";
import Project from "../models/project.js";
import ProjectInvestigators from "../models/ProjectInvestigators.js";
import bcrypt from "bcrypt";
import User from "../models/User";
import ProjectInvestigators from "../models/ProjectInvestigators";
import { v4 as uuidv4 } from "uuid";

export const createProject = async (req, res) => {
  try {
    const {
      fundingSource,
      projectTitle,
      principalImplementingAgency,
      subImplementingAgencies,
      projectInvestigators,
      duration,
      projectOutlay,
      scheduleCompletionDate,
      forms,
      authorizedEmails,
      description,
      status,
    } = req.body;

    if (
      !fundingSource ||
      !projectTitle ||
      !principalImplementingAgency ||
      !projectInvestigators ||
      !duration ||
      !projectOutlay ||
      !scheduleCompletionDate
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const projectCode = await generateProjectCode(fundingSource);

    const transaction = await Project.sequelize.transaction();

    try {
      const project = await Project.create(
        {
          projectCode,
          fundingSource,
          projectTitle,
          principalImplementingAgency,
          subImplementingAgencies,
          duration,
          projectOutlay,
          scheduleCompletionDate,
          forms,
          description,
          authorizedEmails,
          status,
        },
        { transaction }
      );

      if (projectInvestigators && Array.isArray(projectInvestigators)) {
        for (const investigator of projectInvestigators) {
          const { email, name, phone_number, role } = investigator;

          if (!email || !name || !role) {
            throw new Error(
              "Invalid investigator data: email, name, and role are required"
            );
          }

          let user = await User.findOne({
            where: {
              [Op.or]: [
                { email: email },
                { phone_number: phone_number },
                { username: name },
              ],
            },
          });

          if (!user) {
            const password = uuidv4();
            const hashedPassword = await bcrypt.hash(password, 10);

            user = await User.create(
              {
                email,
                name,
                phone_number,
                password_hash: hashedPassword,
                username: name,
                role: "investigator",
              },
              { transaction }
            );

            await sendInvitationEmail(email, password);
          }

          await ProjectInvestigators.create(
            {
              projectId: project.id,
              userId: user.id,
              role,
            },
            { transaction }
          );
        }
      }

      await transaction.commit();

      res.status(201).json({
        success: true,
        message: "Project created successfully",
        projectId: project.id,
        projectCode,
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error in createProject:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the project",
      details: error.message,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: ProjectInvestigators,
          as: "investigators",
          include: [
            {
              model: User,
              as: "User",
              attributes: ["username"],
            },
          ],
        },
      ],
      attributes: [
        "projectTitle",
        "projectCode",
        "startDate",
        "completionDate",
        "status",
      ],
    });

    const formattedProjects = projects.map((project) => {
      const investigator = project.investigators[0]?.user;

      return {
        title: project.projectTitle,
        code: project.projectCode,
        PI: investigator ? investigator.name : "Not Assigned",
        start: project.startDate,
        complete: project.completionDate,
        status: project.status,
        action: "Edit",
      };
    });

    res.status(200).json({
      success: true,
      projects: formattedProjects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
    });
  }
};

// export const getProjectById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const project = await models.Project.findByPk(id);
//     if (!project) {
//       return res.status(404).json({ error: "Project not found" });
//     }
//     res.status(200).json(project);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the project" });
//   }
// };

// export const updateProject = async (req, res) => {
//   const { id } = req.params;
//   const {
//     title,
//     fundingType,
//     durationMonths,
//     startDate,
//     completionDate,
//     projectOutlay,
//   } = req.body;

//   try {
//     const project = await models.Project.findByPk(id);
//     if (!project) {
//       return res.status(404).json({ error: "Project not found" });
//     }

//     project.title = title || project.title;
//     project.fundingType = fundingType || project.fundingType;
//     project.durationMonths = durationMonths || project.durationMonths;
//     project.startDate = startDate || project.startDate;
//     project.completionDate = completionDate || project.completionDate;
//     project.projectOutlay = projectOutlay || project.projectOutlay;

//     await project.save();
//     res.status(200).json(project);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while updating the project" });
//   }
// };

// export const deleteProject = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const project = await models.Project.findByPk(id);
//     if (!project) {
//       return res.status(404).json({ error: "Project not found" });
//     }

//     await project.destroy();
//     res.status(204).send();
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while deleting the project" });
//   }
// };
