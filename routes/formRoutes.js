import express from "express";
import {
  createFundRequisition,
  createProjectCompletionReport,
  createProjectDurationExtension,
  createQuarterlyExpenditureStatement,
  createQuarterlyExpenditureStatementOnCapitalEquipment,
  createQuarterlyStatusReport,
  createRevisionCost,
} from "../controllers/formController.js";

const router = express.Router();

router.post("/fund-requisition", createFundRequisition);
router.post("/project-completion-report", createProjectCompletionReport);
router.post("/project-duration-extension", createProjectDurationExtension);
router.post(
  "/quarterly-expenditure-statement",
  createQuarterlyExpenditureStatement
);
router.post(
  "/quarterly-expenditure-statement-capital-equipment",
  createQuarterlyExpenditureStatementOnCapitalEquipment
);
router.post("/quarterly-status-report", createQuarterlyStatusReport);
router.post("/revision-cost-report", createRevisionCost);


export default router;
