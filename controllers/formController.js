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
    const { projectTitle, projectCode, institutionName, yearPeriod, funds } =
      req.body;

    const {
      LandBuilding,
      CapitalEquipment,
      Manpower,
      Consumables,
      Travel,
      Contingencies,
      WorkshopSeminar,
    } = funds;

    console.log(req.body);

    if (
      !projectTitle ||
      !projectCode ||
      !institutionName ||
      !yearPeriod ||
      !LandBuilding ||
      !CapitalEquipment ||
      !Manpower ||
      !Consumables ||
      !Travel ||
      !Contingencies ||
      !WorkshopSeminar
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const transaction = await FundRequisition.sequelize.transaction();

    try {
      const fundRequisition = await FundRequisition.create(
        {
          projectTitle: projectTitle,
          projectCode,
          institutionName,
          yearPeriod,
          funds: {
            LandBuilding: LandBuilding,
            CapitalEquipment: CapitalEquipment,
            Manpower: Manpower,
            Consumables: Consumables,
            Travel: Travel,
            Contingencies: Contingencies,
            WorkshopSeminar: WorkshopSeminar,
          },
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

    const missingFields = [];
    [
      "title",
      "projectCode",
      "commencementDate",
      "approvedCompletionDate",
      "actualCompletionDate",
      "objectives",
      "workProgram",
      "workDoneDetails",
      "objectivesFulfilled",
      "reasonsUncovered",
      "furtherStudiesNeeded",
      "conclusions",
      "applicationScope",
    ].forEach((field) => {
      if (!req.body[field]?.trim()) missingFields.push(field);
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        fieldErrors: missingFields.reduce((errors, field) => {
          errors[field] = `${field} is required.`;
          return errors;
        }, {}),
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
          associatedPersons: associatedPersons || null,
          finalExpenditureStatement: finalExpenditureStatement || null,
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(201).json({
        success: true,
        message: "Project Completion Report created successfully",
        data: { id: projectCompletionReport.id },
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
    const requiredFields = [
      "projectName",
      "projectCode",
      "principalAgency",
      "projectLeader",
      "startDate",
      "completionDate",
      "approvedObjectives",
      "approvedWorkProgram",
      "workDoneDetails",
      "revisedSchedule",
      "timeExtension",
      "extensionReason",
      "totalCost",
      "actualExpenditure",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        missingFields,
      });
    }

    const transaction = await ProjectDurationExtension.sequelize.transaction();

    try {
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

      await transaction.commit();

      return res.status(201).json({
        success: true,
        message: "Project Duration Extension created successfully",
        projectDurationExtensionId: projectDurationExtension.id,
      });
    } catch (error) {
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
      // Create the QuarterlyExpenditureStatement
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

      // Create associated FinancialDetails if provided
      if (Array.isArray(financialDetails) && financialDetails.length > 0) {
        const details = financialDetails.map((detail) => ({
          category: detail.category,
          totalApproved: detail.totalApproved || 0,
          sanctionedProvision: detail.sanctionedProvision || 0,
          previousYear: detail.previousYear || 0,
          previousQuarter: detail.previousQuarter || 0,
          currentQuarter: detail.currentQuarter || 0,
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
      // Rollback the transaction on error
      await transaction.rollback();
      console.error("Error creating Quarterly Expenditure Statement:", error);
      return res.status(500).json({
        success: false,
        message:
          "An error occurred while creating the Quarterly Expenditure Statement",
        error: error.message,
      });
    }
  } catch (error) {
    console.error("Transaction error:", error);
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
    equipmentDetails, // Array of equipment details
  } = req.body;

  // Basic validation
  if (!projectName || !projectCode || !companyName || !quarterEnding) {
    return res.status(400).json({
      success: false,
      message:
        "Project Name, Project Code, Company Name, and Quarter Ending are required.",
    });
  }

  if (!Array.isArray(equipmentDetails) || equipmentDetails.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one equipment detail is required.",
    });
  }

  try {
    const transaction =
      await QuarterlyExpenditureStatementOnCapitalEquipment.sequelize.transaction();

    try {
      // Create the statement (Quarterly Expenditure)
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

      // Map the equipment details to include the statementId
      const details = equipmentDetails.map((detail) => ({
        equipmentName: detail.equipmentName,
        supplierName: detail.supplierName,
        units: detail.units,
        unitValue: detail.unitValue,
        totalValue: detail.totalValue, // Assume this is calculated on the frontend
        approvedCost: detail.approvedCost, // Assume this is calculated on the frontend
        progressiveExpenditure: detail.progressiveExpenditure,
        statementId: statement.id, // Link to the statement
      }));

      // Insert the equipment details into the database
      await EquipmentDetail.bulkCreate(details, { transaction });

      // Commit the transaction
      await transaction.commit();

      return res.status(201).json({
        success: true,
        message:
          "Quarterly Expenditure Statement on Capital Equipment created successfully",
        statementId: statement.id,
      });
    } catch (error) {
      // Rollback transaction if there is an error
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
    principalImplementingAgency,
    subImplementingAgencies,
    projectInvestigators,
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
      principalImplementingAgency,
      subImplementingAgencies,
      projectInvestigators,
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
    principalImplementingAgency,
    subImplementingAgencies,
    projectInvestigators,
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
      principalImplementingAgency,
      subImplementingAgencies,
      projectInvestigators,
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
