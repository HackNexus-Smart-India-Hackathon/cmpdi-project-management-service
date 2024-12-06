import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.config.js";
import Project from "../project.js";

const QuarterlyStatusReport = sequelize.define(
  "QuarterlyStatusReport",
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
    progressQuarter: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    barChartStatus: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    workDetails: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    slippageReasons: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    correctiveActions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nextQuarterWork: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    expenditureStatement: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default QuarterlyStatusReport;
