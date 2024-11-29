import express from "express";
import { createFundRequisition } from "../controllers/formController.js";
// import {
//   getAllProjects,
//   createProject,
//   getProjectById,
//   updateProject,
//   deleteProject,
// } from "../controllers/projectContoller.js";

const router = express.Router();

router.post("/fund-requisition", createFundRequisition);

export default router;
