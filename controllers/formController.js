import FundRequisition from "../models/Forms/FundRequisition.js";
import ProjectCompletionReport from "../models/Forms/ProjectCompletionReport.js";
import ProjectDurationExtension from "../models/Forms/ProjectDurationExtention.js";
import {
  QuarterlyExpenditureStatement,
  FinancialDetail,
} from "../models/Forms/QuarterlyExpenditureStatement.js";
import {
  QuarterlyExpenditureStatementOnCapitalEquipment,
  EquipmentDetail,
} from "../models/Forms/QuarterlyExpenditureStatementonCapitalEquipment.js";
import QuarterlyStatusReport from "../models/Forms/QuaterlyStatusReport.js";
import RevisionCost from "../models/Forms/RevisionofProjectCost.js";

export const createFundRequisition = async (req, res) => {
  try {
    const {
      projectName,
      projectCode,
      companyName,
      yearPeriod,
      landBuilding,
      capitalEquipment,
      manpower,
      consumables,
      travel,
      contingencies,
      workshops,
      totalApprovedCost,
      totalFundReceived,
      interestEarned,
      expenditureIncurred,
      balanceFund,
      fundProvision,
      fundRequired,
    } = req.body;

    if (
      !projectName ||
      !projectCode ||
      !companyName ||
      !yearPeriod ||
      !landBuilding ||
      !capitalEquipment ||
      !manpower ||
      !consumables ||
      !travel ||
      !contingencies ||
      !workshops ||
      !totalApprovedCost ||
      !totalFundReceived ||
      !expenditureIncurred ||
      !balanceFund ||
      !fundProvision ||
      !fundRequired
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const transaction = await FundRequisition.sequelize.transaction();

    try {
      const fundRequisition = await FundRequisition.create(
        {
          projectName,
          projectCode,
          companyName,
          yearPeriod,
          landBuilding,
          capitalEquipment,
          manpower,
          consumables,
          travel,
          contingencies,
          workshops,
          totalApprovedCost,
          totalFundReceived,
          interestEarned: interestEarned || 0,
          expenditureIncurred,
          balanceFund,
          fundProvision,
          fundRequired,
        },
        { transaction }
      );

      await transaction.commit();

      res.status(201).json({
        success: true,
        message: "Fund requisition created successfully",
        fundRequisitionId: fundRequisition.id,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error in createFundRequisition:", error.message);
      res.status(500).json({
        success: false,
        message: "An error occurred while creating the fund requisition",
        details: error.message,
      });
    }
  } catch (error) {
    console.error("Error in createFundRequisition:", error.message);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred",
      details: error.message,
    });
  }
};

export const createProjectCompletionReport = async (req, res) => {
  try {
    const {
      title,
      projectCode,
      commencementDate,
      approvedCompletionDate,
      actualCompletionDate,
      objectives,
      workProgram,
      workDoneDetails,
      objectivesFulfilled,
      reasonsUncovered,
      furtherStudiesNeeded,
      conclusions,
      applicationScope,
      associatedPersons,
      finalExpenditureStatement,
    } = req.body;

    if (
      !title ||
      !projectCode ||
      !commencementDate ||
      !approvedCompletionDate ||
      !actualCompletionDate ||
      !objectives ||
      !workProgram ||
      !workDoneDetails ||
      !objectivesFulfilled ||
      !reasonsUncovered ||
      !furtherStudiesNeeded ||
      !conclusions ||
      !applicationScope ||
      !associatedPersons ||
      !finalExpenditureStatement
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const transaction = await ProjectCompletionReport.sequelize.transaction();

    try {
      const projectCompletionReport = await ProjectCompletionReport.create(
        {
          title,
          projectCode,
          commencementDate,
          approvedCompletionDate,
          actualCompletionDate,
          objectives,
          workProgram,
          workDoneDetails,
          objectivesFulfilled,
          reasonsUncovered,
          furtherStudiesNeeded,
          conclusions,
          applicationScope,
          associatedPersons,
          finalExpenditureStatement,
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(201).json({
        success: true,
        message: "Project Completion Report created successfully",
        projectCompletionReportId: projectCompletionReport.id,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error in createProjectCompletionReport:", error.message);
      return res.status(500).json({
        success: false,
        message:
          "An error occurred while creating the Project Completion Report",
        details: error.message,
      });
    }
  } catch (error) {
    console.error("Error in createProjectCompletionReport:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred",
      details: error.message,
    });
  }
};

export const createProjectDurationExtension = async (req, res) => {
  try {
    const {
      projectName,
      projectCode,
      principalAgency,
      projectLeader,
      startDate,
      completionDate,
      approvedObjectives,
      approvedWorkProgram,
      workDoneDetails,
      revisedSchedule,
      timeExtension,
      extensionReason,
      totalCost,
      actualExpenditure,
    } = req.body;

    // Validate required fields
    if (
      !projectName ||
      !projectCode ||
      !principalAgency ||
      !projectLeader ||
      !startDate ||
      !completionDate ||
      !approvedObjectives ||
      !approvedWorkProgram ||
      !workDoneDetails ||
      !revisedSchedule ||
      !timeExtension ||
      !extensionReason ||
      !totalCost ||
      !actualExpenditure
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Start transaction
    const transaction = await ProjectDurationExtension.sequelize.transaction();

    try {
      // Create Project Duration Extension
      const projectDurationExtension = await ProjectDurationExtension.create(
        {
          projectName,
          projectCode,
          principalAgency,
          projectLeader,
          startDate,
          completionDate,
          approvedObjectives,
          approvedWorkProgram,
          workDoneDetails,
          revisedSchedule,
          timeExtension,
          extensionReason,
          totalCost,
          actualExpenditure,
        },
        { transaction }
      );

      // Commit transaction
      await transaction.commit();

      return res.status(201).json({
        success: true,
        message: "Project Duration Extension created successfully",
        projectDurationExtensionId: projectDurationExtension.id,
      });
    } catch (error) {
      // Rollback transaction on error
      await transaction.rollback();
      console.error("Error in createProjectDurationExtension:", error.message);
      return res.status(500).json({
        success: false,
        message:
          "An error occurred while creating the Project Duration Extension",
        details: error.message,
      });
    }
  } catch (error) {
    console.error("Error in createProjectDurationExtension:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred",
      details: error.message,
    });
  }
};

export const createQuarterlyExpenditureStatement = async (req, res) => {
  const {
    projectName,
    projectCode,
    companyName,
    quarterEnding,
    fundsAdvanced,
    expenditureToDate,
    unspentBalance,
    financialDetails,
  } = req.body;

  try {
    const transaction =
      await QuarterlyExpenditureStatement.sequelize.transaction();

    try {
      const statement = await QuarterlyExpenditureStatement.create(
        {
          projectName,
          projectCode,
          companyName,
          quarterEnding,
          fundsAdvanced,
          expenditureToDate,
          unspentBalance,
        },
        { transaction }
      );

      if (financialDetails && financialDetails.length > 0) {
        const details = financialDetails.map((detail) => ({
          ...detail,
          statementId: statement.id,
        }));
        await FinancialDetail.bulkCreate(details, { transaction });
      }

      await transaction.commit();

      return res.status(201).json({
        success: true,
        message: "Quarterly Expenditure Statement created successfully",
        statementId: statement.id,
      });
    } catch (error) {
      await transaction.rollback();
      console.error(
        "Error creating Quarterly Expenditure Statement:",
        error.message
      );
      return res.status(500).json({
        success: false,
        message:
          "An error occurred while creating the Quarterly Expenditure Statement",
        error: error.message,
      });
    }
  } catch (error) {
    console.error("Transaction error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred",
      error: error.message,
    });
  }
};

export const createQuarterlyExpenditureStatementOnCapitalEquipment = async (
  req,
  res
) => {
  const {
    projectName,
    projectCode,
    companyName,
    quarterEnding,
    equipmentDetails,
  } = req.body;

  try {
    const transaction =
      await QuarterlyExpenditureStatementOnCapitalEquipment.sequelize.transaction();

    try {
      const statement =
        await QuarterlyExpenditureStatementOnCapitalEquipment.create(
          {
            projectName,
            projectCode,
            companyName,
            quarterEnding,
          },
          { transaction }
        );

      if (equipmentDetails && equipmentDetails.length > 0) {
        const details = equipmentDetails.map((detail) => ({
          ...detail,
          statementId: statement.id,
        }));
        await EquipmentDetail.bulkCreate(details, { transaction });
      }

      await transaction.commit();

      return res.status(201).json({
        success: true,
        message:
          "Quarterly Expenditure Statement on Capital Equipment created successfully",
        statementId: statement.id,
      });
    } catch (error) {
      await transaction.rollback();
      console.error(
        "Error creating Quarterly Expenditure Statement on Capital Equipment:",
        error.message
      );
      return res.status(500).json({
        success: false,
        message:
          "An error occurred while creating the Quarterly Expenditure Statement on Capital Equipment",
        error: error.message,
      });
    }
  } catch (error) {
    console.error("Transaction error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred",
      error: error.message,
    });
  }
};

export const createQuarterlyStatusReport = async (req, res) => {
  const {
    projectName,
    projectCode,
    progressQuarter,
    principalAgency,
    subAgency,
    projectCoordinator,
    startDate,
    completionDate,
    barChartStatus,
    workDetails,
    slippageReasons,
    correctiveActions,
    nextQuarterWork,
    expenditureStatement,
  } = req.body;

  try {
    const report = await QuarterlyStatusReport.create({
      projectName,
      projectCode,
      progressQuarter,
      principalAgency,
      subAgency,
      projectCoordinator,
      startDate,
      completionDate,
      barChartStatus,
      workDetails,
      slippageReasons,
      correctiveActions,
      nextQuarterWork,
      expenditureStatement,
    });

    return res.status(201).json({
      success: true,
      message: "Quarterly Status Report created successfully",
      report,
    });
  } catch (error) {
    console.error("Error creating Quarterly Status Report:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the Quarterly Status Report",
      error: error.message,
    });
  }
};

export const createRevisionCost = async (req, res) => {
  const {
    projectName,
    projectCode,
    principalAgency,
    projectLeader,
    startDate,
    scheduledCompletionDate,
    approvedObjective,
    approvedWorkProgram,
    workDetails,
    totalApprovedCost,
    revisedTimeSchedule,
    actualExpenditure,
    revisedCost,
    justification,
  } = req.body;

  try {
    const revisionCost = await RevisionCost.create({
      projectName,
      projectCode,
      principalAgency,
      projectLeader,
      startDate,
      scheduledCompletionDate,
      approvedObjective,
      approvedWorkProgram,
      workDetails,
      totalApprovedCost,
      revisedTimeSchedule,
      actualExpenditure,
      revisedCost,
      justification,
    });

    return res.status(201).json({
      success: true,
      message: "Revision Cost created successfully",
      revisionCost,
    });
  } catch (error) {
    console.error("Error creating Revision Cost:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the Revision Cost",
      error: error.message,
    });
  }
};
