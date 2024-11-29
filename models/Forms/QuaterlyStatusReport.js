import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.config.js";

const QuarterlyStatusReport = sequelize.define(
  "QuarterlyStatusReport",
  {
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    projectCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    progressQuarter: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    principalAgency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    subAgency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    projectCoordinator: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    completionDate: {
      type: DataTypes.DATE,
      allowNull: false,
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
