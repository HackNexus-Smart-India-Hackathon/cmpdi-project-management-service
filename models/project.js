import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectCode: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    projectTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fundingSource: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    principalImplementingAgency: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    subImplementingAgencies: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    adminEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectInvestigatorEmail: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    scheduleCompletionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    principalOutlay: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    subOutlay: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Project",
  }
);

export default Project;
