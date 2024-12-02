import Project from "./project.js";
import User from "./User.js";
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const ProjectInvestigators = sequelize.define("ProjectInvestigators", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  projectId: {
    // Renamed from "project" to "projectId"
    type: DataTypes.INTEGER,
    references: {
      model: "Projects", // Ensure the table name matches the Project model
      key: "id", // Foreign key referencing the Projects table
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "User", // Ensure the table name matches the User model
      key: "id", // Foreign key referencing the User table
    },
  },
});

// Define the many-to-many relationship between Project and User
User.belongsToMany(Project, { through: ProjectInvestigators });
Project.belongsToMany(User, { through: ProjectInvestigators });

export default ProjectInvestigators;
