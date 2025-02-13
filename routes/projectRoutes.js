import express from "express";
import {
  createProject,
  getProjectsByAdmin,
  getInvestigatorsByProjectId,
  getProjectsByInvestigatorEmail,
  getProjectById,
  addMilestones,
  getMilestones
} from "../controllers/projectContoller.js";

const router = express.Router();

router.post("/create", createProject);
router.get("/admin/:adminId/projects", getProjectsByAdmin);
router.get("/project/:projectId/investigators", getInvestigatorsByProjectId);
router.get("/investigator/projects", getProjectsByInvestigatorEmail);
router.get("/project/:projectId", getProjectById); 
router.post("/:projectId/addTimeline" , addMilestones);
router.get("/:projectId/getMilestones", getMilestones);
export default router;
