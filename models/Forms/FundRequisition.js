import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.config.js";
import Project from "../project.js";

const FundRequisition = sequelize.define(
  "FundRequisition",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Project",
        key: "id",
      },
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
