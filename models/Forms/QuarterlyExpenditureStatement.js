import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.config.js";

const FinancialDetail = sequelize.define("FinancialDetail", {
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalApproved: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  sanctionedProvision: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  incurredPreviousYear: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  incurredPreviousQuarter: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  currentQuarter: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

const QuarterlyExpenditureStatement = sequelize.define(
  "QuarterlyExpenditureStatement",
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
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    quarterEnding: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fundsAdvanced: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
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
