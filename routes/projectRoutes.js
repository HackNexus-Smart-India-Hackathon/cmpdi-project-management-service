import express from "express";
import {
  createProject,
  getProjectsByAdmin,
} from "../controllers/projectContoller.js";

const router = express.Router();

router.post("/create", createProject);
router.get("/admin/:adminId/projects", getProjectsByAdmin);

export default router;
