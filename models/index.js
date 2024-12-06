import Project from "./models/Project.js";
import FundRequisition from "./models/FundRequisition.js";
import ProjectCompletionReport from "./Forms/ProjectCompletionReport.js";
import ProjectDurationExtension from "./Forms/ProjectDurationExtention.js";
import QuarterlyExpenditureStatement from "./Forms/QuarterlyExpenditureStatement.js";
import QuarterlyExpenditureStatementOnCapitalEquipment from "./Forms/QuarterlyExpenditureStatementonCapitalEquipment.js";
import QuarterlyStatusReport from "./Forms/QuaterlyStatusReport.js";
import RevisionCost from "./Forms/RevisionofProjectCost.js";

// Define relationships
Project.hasMany(FundRequisition, {
  foreignKey: "projectId",
  as: "fundRequisitions",
});
FundRequisition.belongsTo(Project, {
  foreignKey: "projectId",
  as: "Project",
});

Project.hasMany(ProjectCompletionReport, {
  foreignKey: "projectId",
  as: "completionReports",
});
ProjectCompletionReport.belongsTo(Project, {
  foreignKey: "projectId",
  as: "Project",
});

Project.hasMany(ProjectDurationExtension, {
  foreignKey: "projectId",
  as: "durationExtensions",
});
ProjectDurationExtension.belongsTo(Project, {
  foreignKey: "projectId",
  as: "Project",
});

Project.hasMany(QuarterlyExpenditureStatement, {
  foreignKey: "projectId",
  as: "expenditureStatements",
});
QuarterlyExpenditureStatement.belongsTo(Project, {
  foreignKey: "projectId",
  as: "Project",
});

Project.hasMany(QuarterlyExpenditureStatementOnCapitalEquipment, {
  foreignKey: "projectId",
  as: "capitalExpenditureStatements",
});
QuarterlyExpenditureStatementOnCapitalEquipment.belongsTo(Project, {
  foreignKey: "projectId",
  as: "Project",
});

Project.hasMany(QuarterlyStatusReport, {
  foreignKey: "projectId",
  as: "statusReports",
});
QuarterlyStatusReport.belongsTo(Project, {
  foreignKey: "projectId",
  as: "Project",
});

Project.hasMany(RevisionCost, {
  foreignKey: "projectId",
  as: "revisionCosts",
});
RevisionCost.belongsTo(Project, {
  foreignKey: "projectId",
  as: "Project",
});
