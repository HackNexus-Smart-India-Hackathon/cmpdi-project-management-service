import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.config.js";
import Project from "../project.js";

const QuarterlyExpenditureStatementOnCapitalEquipment = sequelize.define(
  "QuarterlyExpenditureStatementOnCapitalEquipment",
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
    quarterEnding: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    equipmentName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    supplierName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    unitValue: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    totalValue: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    approvedCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    progressiveExpenditure: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default QuarterlyExpenditureStatementOnCapitalEquipment;
