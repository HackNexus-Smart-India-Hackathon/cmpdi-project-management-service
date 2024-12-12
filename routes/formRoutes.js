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
  formStatus,
  updateForm,
} from "../controllers/formController.js";

const router = express.Router();

//fund-requisition
router.post("/fund-requisition", createFundRequisition);
router.get("/fund-requisition/project/:projectId", getFundRequisitionByProjectId);
router.get("/fund-requisition/form/:formId", getFundRequisitionById);
//project-completion-report
router.post("/project-completion-report", createProjectCompletionReport);
router.get(
  "/project-completion-report/project/:projectId",
  getProjectCompletionReportByProjectId
);
router.get(
  "/project-completion-report/form/:formId",
  getProjectCompletionReportById
);
//project-duration-extension
router.post("/project-duration-extension", createProjectDurationExtension);
router.get(
  "/project-duration-extension/project/:projectId",
  getProjectDurationExtensionByProjectId
);
router.get(
  "/project-duration-extension/form/:formId",
  getProjectDurationExtensionById
);
//quarterly-expenditure-statement
router.post(
  "/quarterly-expenditure-statement",
  createQuarterlyExpenditureStatement
);
router.get(
  "/quarterly-expenditure-statement/project/:projectId",
  getQuarterlyExpenditureStatementByProjectId
);
router.get(
  "/quarterly-expenditure-statement/form/:formId",
  getQuarterlyExpenditureStatementById
);
//quarterly-expenditure-statement-capital-equipment
router.post(
  "/quarterly-expenditure-statement-capital-equipment",
  createQuarterlyExpenditureStatementOnCapitalEquipment
);
router.get(
  "/quarterly-expenditure-statement-capital-equipment/project/:projectId",
  getQuarterlyExpenditureStatementOnCapitalEquipmentByProjectId
);
router.get(
  "/quarterly-expenditure-statement-capital-equipment/form/:formId",
  getQuarterlyExpenditureStatementOnCapitalEquipmentById
);
//quarterly-status-report
router.post("/quarterly-status-report", createQuarterlyStatusReport);
router.get(
  "/quarterly-status-report/project/:projectId",
  getQuarterlyStatusReportByProjectId
);
router.get("/quarterly-status-report/form/:formId", getQuarterlyStatusReportById);
//revision-cost-report
router.post("/revision-cost-report", createRevisionCost);
router.get("/revision-cost-report/project/:projectId", getRevisionCostByProjectId);
router.get("/revision-cost-report/form/:formId", getRevisionCostById);
router.put('/approved/form'  ,  formStatus)
router.put('/update/forms' , updateForm)

export default router;
