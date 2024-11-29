import FundRequisition from "../models/Forms/FundRequisition.js";

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
