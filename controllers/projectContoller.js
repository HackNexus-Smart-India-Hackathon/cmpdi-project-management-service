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
    } = req.body;

    if (
      !fundingSource ||
      !projectTitle ||
      !principalImplementingAgency ||
      !projectInvestigators ||
      !startDate ||
      !scheduleCompletionDate ||
      !projectOutlay ||
      !status
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
          projectTitle,
          fundingSource,
          description,
          principalImplementingAgency,
          subImplementingAgencies,
          startDate,
          scheduleCompletionDate,
          projectOutlay,
          status,
        },
        { transaction }
      );

      if (projectInvestigators && Array.isArray(projectInvestigators)) {
        for (const { email } of projectInvestigators) {
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
    console.log(error);
    console.error("Error in createProject:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the project",
      details: error.message,
    });
  }
};
