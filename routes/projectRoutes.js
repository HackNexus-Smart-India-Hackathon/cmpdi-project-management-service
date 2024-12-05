import express from "express";
import {
  createProject,
  getProjectsByAdmin,
  getInvestigatorsByProjectId,
} from "../controllers/projectContoller.js";

const router = express.Router();

router.post("/create", createProject);
router.get("/admin/:adminId/projects", getProjectsByAdmin);
router.get("/project/:projectId/investigators", getInvestigatorsByProjectId);

export default router;
