// import { sequelize } from "./models/index.js";
import app from "./app.js";
import Project from "./models/project.js";
import User from "./models/User.js";
import FundRequisition from "./models/Forms/FundRequisition.js";
import ProjectCompletionReport from "./models/Forms/ProjectCompletionReport.js";
import ProjectDurationExtension from "./models/Forms/ProjectDurationExtention.js";
import QuarterlyStatusReport from "./models/Forms/QuaterlyStatusReport.js";
import QuarterlyExpenditureStatement from "./models/Forms/QuarterlyExpenditureStatement.js";
import RevisionCost from "./models/Forms/RevisionofProjectCost.js";

// import { QuarterlyExpenditureStatementOnCapitalEquipment } from "./models/Forms/QuarterlyExpenditureStatementOnCapitalEquipment.js";

import { sequelize } from "./config/db.config.js";

const PORT = 5001;

sequelize
  .sync()

  .then(() => {
    console.log("Database connected");
    app
      .listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      })
      .on("error", (err) => {
        console.error("Server error:", err.message);
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
