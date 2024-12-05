import express from "express";
import {
  createFundRequisition,
  getFundRequisitionByProjectId,
  getFundRequisitionById,
  createProjectCompletionReport,
  getProjectCompletionReportById,
  getProjectCompletionReportByProjectId,
  createProjectDurationExtension,
  getProjectDurationExtensionById,
  getProjectDurationExtensionByProjectId,
  createQuarterlyExpenditureStatement,
  getQuarterlyExpenditureStatementById,
  getQuarterlyExpenditureStatementByProjectId,
  createQuarterlyExpenditureStatementOnCapitalEquipment,
  getQuarterlyExpenditureStatementOnCapitalEquipmentById,
  getQuarterlyExpenditureStatementOnCapitalEquipmentByProjectId,
  createQuarterlyStatusReport,
  getQuarterlyStatusReportById,
  getQuarterlyStatusReportByProjectId,
  createRevisionCost,
  getRevisionCostByProjectId,
  getRevisionCostById,
} from "../controllers/formController.js";

const router = express.Router();

//fund-requisition
router.post("/fund-requisition", createFundRequisition);
router.get("/fund-requisition/:projectId", getFundRequisitionByProjectId);
router.get("/fund-requisition/:formId", getFundRequisitionById);
//project-completion-report
router.post("/project-completion-report", createProjectCompletionReport);
router.get(
  "/project-completion-report/:projectId",
  getProjectCompletionReportByProjectId
);
router.get(
  "/project-completion-report/:formId",
  getProjectCompletionReportById
);
//project-duration-extension
router.post("/project-duration-extension", createProjectDurationExtension);
router.get(
  "/project-duration-extension/:projectId",
  getProjectDurationExtensionByProjectId
);
router.get(
  "/project-duration-extension/:formId",
  getProjectDurationExtensionById
);
//quarterly-expenditure-statement
router.post(
  "/quarterly-expenditure-statement",
  createQuarterlyExpenditureStatement
);
router.get(
  "/quarterly-expenditure-statement/:projectId",
  getQuarterlyExpenditureStatementByProjectId
);
router.get(
  "/quarterly-expenditure-statement/:formId",
  getQuarterlyExpenditureStatementById
);
//quarterly-expenditure-statement-capital-equipment
router.post(
  "/quarterly-expenditure-statement-capital-equipment",
  createQuarterlyExpenditureStatementOnCapitalEquipment
);
router.get(
  "/quarterly-expenditure-statement-capital-equipment/:projectId",
  getQuarterlyExpenditureStatementOnCapitalEquipmentByProjectId
);
router.get(
  "/quarterly-expenditure-statement-capital-equipment/:formId",
  getQuarterlyExpenditureStatementOnCapitalEquipmentById
);
//quarterly-status-report
router.post("/quarterly-status-report", createQuarterlyStatusReport);
router.get(
  "/quarterly-status-report/:projectId",
  getQuarterlyStatusReportByProjectId
);
router.get("/quarterly-status-report/:formId", getQuarterlyStatusReportById);
//revision-cost-report
router.post("/revision-cost-report", createRevisionCost);
router.get("/revision-cost-report/:projectId", getRevisionCostByProjectId);
router.get("/revision-cost-report/:formId", getRevisionCostById);

export default router;
