import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.config.js";

const FinancialDetail = sequelize.define("FinancialDetail", {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalApproved: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
    },
  },
  sanctionedProvision: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
    },
  },
  previousYear: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
    },
  },
  previousQuarter: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
    },
  },
  currentQuarter: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
    },
  },
});

const QuarterlyExpenditureStatement = sequelize.define(
  "QuarterlyExpenditureStatement",
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

    expenditureToDate: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    unspentBalance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    fundsAdvanced: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);


QuarterlyExpenditureStatement.hasMany(FinancialDetail, {
  foreignKey: "statementId",
  as: "financialDetails",
});
FinancialDetail.belongsTo(QuarterlyExpenditureStatement, {
  foreignKey: "statementId",
  as: "statement",
});

export { FinancialDetail, QuarterlyExpenditureStatement };
export default QuarterlyExpenditureStatement;
