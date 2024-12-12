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
} from "../models/Forms/QuarterlyExpenditureStatementOnCapitalEquipment.js"; // Ensure paths to models are correct
import QuarterlyStatusReport from "../models/Forms/QuaterlyStatusReport.js";
import RevisionCost from "../models/Forms/RevisionofProjectCost.js";
import User from "../models/User.js";

//Fund Requisition
export const createFundRequisition = async (req, res) => {
  try {
    const { projectId, yearPeriod, funds } = req.body;
    console.log("projectId", projectId);
    if (!projectId || !yearPeriod || !funds) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (projectId, yearPeriod, or funds)",
      });
    }

    const transaction = await FundRequisition.sequelize.transaction();

    try {
      const fundRequisition = await FundRequisition.create(
        {
          projectId,
          yearPeriod,
          funds,
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(201).json({
        success: true,
        message: "Fund requisition created successfully",
        fundRequisitionId: fundRequisition.id,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error in createFundRequisition:", error.message);
      return res.status(500).json({
        success: false,
        message: "An error occurred while creating the fund requisition",
        details: error.message,
      });
    }
  } catch (error) {
    console.error("Error in createFundRequisition:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred",
      details: error.message,
    });
  }
};

export const getFundRequisitionByProjectId = async (req, res) => {
  const { projectId } = req.params;

  try {
    const fundRequisitions = await FundRequisition.findAll({
      where: { projectId },
    });

    if (fundRequisitions.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No fund requisitions found for projectId: ${projectId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: fundRequisitions,
    });
  } catch (error) {
    console.error("Error in getFundRequisitionsByProjectId:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching fund requisitions",
      details: error.message,
    });
  }
};

export const getFundRequisitionById = async (req, res) => {
  const { formId } = req.params;

  try {
    const fundRequisition = await FundRequisition.findByPk(formId);

    if (!fundRequisition) {
      return res.status(404).json({
        success: false,
        message: `No fund requisition found for formId: ${formId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: fundRequisition,
    });
  } catch (error) {
    console.error("Error in getFundRequisitionById:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the fund requisition",
      details: error.message,
    });
  }
};

//Project Completion Report

export const createProjectCompletionReport = async (req, res) => {
  try {
    const {
      projectId,
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
      "projectId",
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
      if (!req.body[field]) missingFields.push(field);
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
      const report = await ProjectCompletionReport.create(
        {
          projectId,
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
        data: { id: report.id },
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

export const getProjectCompletionReportByProjectId = async (req, res) => {
  const { projectId } = req.params;

  try {
    const reports = await ProjectCompletionReport.findAll({
      where: { projectId },
    });

    if (reports.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No project completion reports found for project ID: ${projectId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error) {
    console.error(
      "Error in getProjectCompletionReportsByProjectId:",
      error.message
    );
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while fetching the project completion reports",
      details: error.message,
    });
  }
};

export const getProjectCompletionReportById = async (req, res) => {
  const { formId } = req.params;

  try {
    const report = await ProjectCompletionReport.findByPk(formId);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: `No project completion report found with ID: ${formId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error("Error in getProjectCompletionReportById:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the project completion report",
      details: error.message,
    });
  }
};

//Project Duration Extension

export const createProjectDurationExtension = async (req, res) => {
  try {
    const {
      projectId,
      approvedObjectives,
      approvedWorkProgram,
      workDoneDetails,
      revisedSchedule,
      timeExtension,
      extensionReason,
      totalCost,
      actualExpenditure,
    } = req.body;
    const missingFields = [];
    [
      "projectId",
      "approvedObjectives",
      "approvedWorkProgram",
      "workDoneDetails",
      "revisedSchedule",
      "timeExtension",
      "extensionReason",
      "totalCost",
      "actualExpenditure",
    ].forEach((field) => {
      if (!req.body[field]) missingFields.push(field);
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

    const transaction = await ProjectDurationExtension.sequelize.transaction();

    try {
      const extension = await ProjectDurationExtension.create(
        {
          projectId,
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
        data: { id: extension.id },
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

export const getProjectDurationExtensionByProjectId = async (req, res) => {
  const { projectId } = req.params;

  try {
    const extensions = await ProjectDurationExtension.findAll({
      where: { projectId },
    });

    if (extensions.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No project duration extensions found for project ID: ${projectId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: extensions,
    });
  } catch (error) {
    console.error(
      "Error in getProjectDurationExtensionsByProjectId:",
      error.message
    );
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while fetching the project duration extensions",
      details: error.message,
    });
  }
};

export const getProjectDurationExtensionById = async (req, res) => {
  const { formId } = req.params;

  try {
    const extension = await ProjectDurationExtension.findByPk(formId);

    if (!extension) {
      return res.status(404).json({
        success: false,
        message: `No project duration extension found with ID: ${formId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: extension,
    });
  } catch (error) {
    console.error("Error in getProjectDurationExtensionById:", error.message);
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while fetching the project duration extension",
      details: error.message,
    });
  }
};

//Quaterly Expenditure statement

export const createQuarterlyExpenditureStatement = async (req, res) => {
  const transaction =
    await QuarterlyExpenditureStatement.sequelize.transaction();

  try {
    const {
      projectId,
      quarterEnding,
      expenditureToDate,
      unspentBalance,
      fundsAdvanced,
      financialDetails,
    } = req.body;

    const missingFields = [];
    [
      "projectId",
      "quarterEnding",
      "fundsAdvanced",
      "expenditureToDate",
      "unspentBalance",
    ].forEach((field) => {
      if (!req.body[field]) missingFields.push(field);
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

    if (!Array.isArray(financialDetails) || financialDetails.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Financial details are required and should be a non-empty array",
      });
    }

    const statement = await QuarterlyExpenditureStatement.create(
      {
        projectId,
        quarterEnding,
        expenditureToDate,
        unspentBalance,
        fundsAdvanced,
      },
      { transaction }
    );

    const financialDetailsData = financialDetails.map((detail) => ({
      ...detail,
      statementId: statement.id,
    }));

    await FinancialDetail.bulkCreate(financialDetailsData, { transaction });

    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: "Quarterly Expenditure Statement created successfully",
      data: {
        id: statement.id,
        financialDetails: financialDetailsData.map((detail) => ({
          category: detail.category,
          totalApproved: detail.totalApproved,
          sanctionedProvision: detail.sanctionedProvision,
          fundsAdvanced: detail.fundsAdvanced,
          currentQuarter: detail.currentQuarter,
          previousQuarter: detail.previousQuarter,
          previousYear: detail.previousYear,
        })),
      },
    });
  } catch (error) {
    if (transaction) await transaction.rollback();

    console.error(
      "Error in createQuarterlyExpenditureStatement:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "An error occurred while creating the Quarterly Expenditure Statement",
      details: error.message,
    });
  }
};

export const getQuarterlyExpenditureStatementById = async (req, res) => {
  const { formId } = req.params;

  try {
    const statement = await QuarterlyExpenditureStatement.findByPk(formId);

    if (!statement) {
      return res.status(404).json({
        success: false,
        message: `No Quarterly Expenditure Statement found with ID: ${formId}`,
      });
    } else {
      const financialDetails = await FinancialDetail.findAll({
        where: { statementId: formId },
      });

      statement.dataValues.financialDetails = financialDetails;
    }

    return res.status(200).json({
      success: true,
      data: statement,
    });
  } catch (error) {
    console.error(
      "Error in getQuarterlyExpenditureStatementById:",
      error.message
    );
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while fetching the Quarterly Expenditure Statement",
      details: error.message,
    });
  }
};

export const getQuarterlyExpenditureStatementByProjectId = async (req, res) => {
  const { projectId } = req.params;

  try {
    const statements = await QuarterlyExpenditureStatement.findAll({
      where: { projectId },
    });

    if (statements.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No Quarterly Expenditure Statements found for project ID: ${projectId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: statements,
    });
  } catch (error) {
    console.error(
      "Error in getQuarterlyExpenditureStatementsByProjectId:",
      error.message
    );
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while fetching the Quarterly Expenditure Statements",
      details: error.message,
    });
  }
};

//Quarterly Expenditure Statement on Capital Equipment

export const createQuarterlyExpenditureStatementOnCapitalEquipment = async (
  req,
  res
) => {
  const { projectId, quarterEnding, equipmentDetails } = req.body;

  const missingFields = [];
  if (!projectId) missingFields.push("projectId");
  if (!quarterEnding) missingFields.push("quarterEnding");
  if (!Array.isArray(equipmentDetails) || equipmentDetails.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one equipment detail is required.",
    });
  }

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

  try {
    const transaction =
      await QuarterlyExpenditureStatementOnCapitalEquipment.sequelize.transaction();

    try {
      const statement =
        await QuarterlyExpenditureStatementOnCapitalEquipment.create(
          {
            projectId,
            quarterEnding,
          },
          { transaction }
        );

      const equipmentPromises = equipmentDetails.map((detail) => {
        return EquipmentDetail.create(
          {
            statementId: statement.id,
            equipmentName: detail.equipmentName,
            supplierName: detail.supplierName,
            units: detail.units,
            unitValue: detail.unitValue,
            totalValue: detail.totalValue || detail.units * detail.unitValue, // Calculate if not provided
            approvedCost: detail.approvedCost || 0,
            progressiveExpenditure: detail.progressiveExpenditure,
          },
          { transaction }
        );
      });

      await Promise.all(equipmentPromises);

      // Commit transaction
      await transaction.commit();

      return res.status(201).json({
        success: true,
        message:
          "Quarterly Expenditure Statement on Capital Equipment created successfully.",
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
          "An error occurred while creating the Quarterly Expenditure Statement on Capital Equipment.",
        error: error.message,
      });
    }
  } catch (error) {
    console.error("Transaction error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
      error: error.message,
    });
  }
};

export const getQuarterlyExpenditureStatementOnCapitalEquipmentByProjectId =
  async (req, res) => {
    const { projectId } = req.params;

    try {
      const statements =
        await QuarterlyExpenditureStatementOnCapitalEquipment.findAll({
          where: { projectId },
        });

      if (statements.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No Quarterly Expenditure Statements on Capital Equipment found for project ID: ${projectId}`,
        });
      }

      return res.status(200).json({
        success: true,
        data: statements,
      });
    } catch (error) {
      console.error(
        "Error in getQuarterlyExpenditureStatementsOnCapitalEquipmentByProjectId:",
        error.message
      );
      return res.status(500).json({
        success: false,
        message:
          "An error occurred while fetching the Quarterly Expenditure Statements on Capital Equipment",
        details: error.message,
      });
    }
  };

export const getQuarterlyExpenditureStatementOnCapitalEquipmentById = async (
  req,
  res
) => {
  const { formId } = req.params;

  try {
    const statement =
      await QuarterlyExpenditureStatementOnCapitalEquipment.findByPk(formId);

    if (!statement) {
      return res.status(404).json({
        success: false,
        message: `No Quarterly Expenditure Statement on Capital Equipment found with ID: ${formId}`,
      });
    } else {
      const equipmentDetails = await EquipmentDetail.findAll({
        where: { statementId: formId },
      });

      statement.dataValues.equipmentDetails = equipmentDetails;
    }

    return res.status(200).json({
      success: true,
      data: statement,
    });
  } catch (error) {
    console.error(
      "Error in getQuarterlyExpenditureStatementOnCapitalEquipmentById:",
      error.message
    );
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while fetching the Quarterly Expenditure Statement on Capital Equipment",
      details: error.message,
    });
  }
};

//Quarterly Status Report

export const createQuarterlyStatusReport = async (req, res) => {
  const {
    projectId,
    progressQuarter,
    barChartStatus,
    workDetails,
    slippageReasons,
    correctiveActions,
    nextQuarterWork,
    expenditureStatement,
  } = req.body;

  // Validate required fields
  if (
    !projectId ||
    !progressQuarter ||
    !barChartStatus ||
    !workDetails ||
    !nextQuarterWork ||
    !expenditureStatement
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Project ID, Progress Quarter, Bar Chart Status, Work Details, Next Quarter Work, and Expenditure Statement are required.",
    });
  }

  try {
    // Create the quarterly status report in the database
    const report = await QuarterlyStatusReport.create({
      projectId,
      progressQuarter,
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

export const getQuarterlyStatusReportByProjectId = async (req, res) => {
  const { projectId } = req.query;

  if (!projectId) {
    return res.status(400).json({
      success: false,
      message: "'projectId' is required to fetch the reports.",
    });
  }

  try {
    const reports = await QuarterlyStatusReport.findAll({
      where: { projectId },
    });

    if (reports.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Quarterly Status Reports found for the given projectId.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quarterly Status Reports retrieved successfully",
      data: reports,
    });
  } catch (error) {
    console.error(
      "Error fetching Quarterly Status Reports by projectId:",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the reports",
      error: error.message,
    });
  }
};

export const getQuarterlyStatusReportById = async (req, res) => {
  const { formId } = req.query;

  if (!formId) {
    return res.status(400).json({
      success: false,
      message: "'formId' is required to fetch the report.",
    });
  }

  try {
    const report = await QuarterlyStatusReport.findOne({
      where: { id: formId },
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "No Quarterly Status Report found for the given formId.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quarterly Status Report retrieved successfully",
      data: report,
    });
  } catch (error) {
    console.error(
      "Error fetching Quarterly Status Report by formId:",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the report",
      error: error.message,
    });
  }
};

// Revision Cost

export const createRevisionCost = async (req, res) => {
  const {
    projectId,
    approvedObjective,
    approvedWorkProgram,
    workDetails,
    totalApprovedCost,
    revisedTimeSchedule,
    actualExpenditure,
    revisedCost,
    justification,
  } = req.body;

  // Basic validation
  if (
    !projectId ||
    !approvedObjective ||
    !approvedWorkProgram ||
    !workDetails ||
    !totalApprovedCost ||
    !revisedTimeSchedule ||
    !actualExpenditure ||
    !revisedCost ||
    !justification
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  try {
    // Create a new revision cost entry
    const revisionCost = await RevisionCost.create({
      projectId,
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

export const getRevisionCostByProjectId = async (req, res) => {
  const { projectId } = req.query;

  if (!projectId) {
    return res.status(400).json({
      success: false,
      message: "'projectId' is required to fetch the revision costs.",
    });
  }

  try {
    const revisionCosts = await RevisionCost.findAll({
      where: { projectId },
    });

    if (revisionCosts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Revision Costs found for the given projectId.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Revision Costs retrieved successfully",
      data: revisionCosts,
    });
  } catch (error) {
    console.error("Error fetching Revision Costs by projectId:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the revision costs",
      error: error.message,
    });
  }
};

export const getRevisionCostById = async (req, res) => {
  const { formId } = req.query;

  if (!formId) {
    return res.status(400).json({
      success: false,
      message: "'formId' is required to fetch the revision cost.",
    });
  }

  try {
    const revisionCost = await RevisionCost.findOne({
      where: { id: formId },
    });

    if (!revisionCost) {
      return res.status(404).json({
        success: false,
        message: "No Revision Cost found for the given formId.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Revision Cost retrieved successfully",
      data: revisionCost,
    });
  } catch (error) {
    console.error("Error fetching Revision Cost by formId:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the revision cost",
      error: error.message,
    });
  }
};


export const formStatus = async (req, res) => {
  try {
    const { adminId, formId, approval } = req.body
    if (!adminId || !formId || !approval)
      return res.status(400).json({ err: "admin or form not found" })

    const adminUser = await User.findByPk(adminId);
    if (!adminUser) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    try {
      const form = await FundRequisition.findByPk(formId)

      if (!form)
        return res.status(400).json({ message: "form not found" })
      try {
        const transaction = await FundRequisition.sequelize.transaction()

        try {
          await form.update({
            status : approval
          }, { transaction })

          await transaction.commit();

          return res.status(400).json({ message: "transaction completed" })
        } catch (error) {
          await transaction.rollback()
          console.error(error)
          return res.status(500).json({ message: "Internal Server Error" })
        }

      } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal Server Error" })
      }

    } catch (errorForm) {
      console.error(errorForm)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}
export const updateForm = async (req, res) => {
  try {
    const { adminId, formId, yearPeriod, funds } = req.body
    if (!adminId || !formId || !yearPeriod || !funds)
      return res.status(400).json({ err: "admin or form not found" })

    const adminUser = await User.findByPk(adminId);
    if (!adminUser) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    try {
      const form = await FundRequisition.findByPk(formId)

      if (!form)
        return res.status(400).json({ message: "form not found" })
      try {
        const transaction = await FundRequisition.sequelize.transaction()

        try {
          await form.update({
            yearPeriod,
            funds
          }, { transaction })

          await transaction.commit();

          return res.status(400).json({ message: "transaction completed" })
        } catch (error) {
          await transaction.rollback()
          console.error(error)
          return res.status(500).json({ message: "Internal Server Error" })
        }

      } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal Server Error" })
      }

    } catch (errorForm) {
      console.error(errorForm)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }

}