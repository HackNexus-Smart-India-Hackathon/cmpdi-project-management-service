import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.config.js";

const FundRequisition = sequelize.define(
  "FundRequisition",
  {
    projectTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    institutionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearPeriod: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    funds: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
  },
  {
    timestamps: true,
  }
);

export default FundRequisition;
