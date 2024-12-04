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
    principalImplementingAgency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    subImplementingAgencies: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },

    projectInvestigators: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
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
