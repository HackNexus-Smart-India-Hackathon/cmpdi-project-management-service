import express from "express";
import { createFundRequisition, createProjectCompletionReport } from "../controllers/formController.js";
// import {
//   getAllProjects,
//   createProject,
//   getProjectById,
//   updateProject,
//   deleteProject,
// } from "../controllers/projectContoller.js";

const router = express.Router();

router.post("/fund-requisition", createFundRequisition);
router.post("/project-completion-report",createProjectCompletionReport);

export default router;
