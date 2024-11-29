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
      unique: true,
    },
    fundingSource: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    principalImplementingAgency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subImplementingAgencies: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectOutlay: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    scheduleCompletionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    forms: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    authorizedEmails: {
      type: DataTypes.JSON, 
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Project;
