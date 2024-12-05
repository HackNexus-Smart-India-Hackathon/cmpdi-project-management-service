import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.config.js";

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
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    supplierName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    unitValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
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
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    timestamps: true, // Retaining timestamps for records
  }
);

export default QuarterlyExpenditureStatementOnCapitalEquipment;
