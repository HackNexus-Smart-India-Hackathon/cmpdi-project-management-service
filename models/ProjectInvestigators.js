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
    type: DataTypes.INTEGER,
    references: {
      model: "Projects",
      key: "id",
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "User",
      key: "id",
    },
  },
});

User.belongsToMany(Project, { through: ProjectInvestigators });
Project.belongsToMany(User, { through: ProjectInvestigators });

export default ProjectInvestigators;
