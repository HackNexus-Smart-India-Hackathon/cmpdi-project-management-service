import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.config.js";

const EquipmentDetail = sequelize.define(
  "EquipmentDetail",
  {
    equipmentName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    supplierName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    unitValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    totalValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    approvedCost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    progressiveExpenditure: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    timestamps: false,
  }
);

const QuarterlyExpenditureStatementOnCapitalEquipment = sequelize.define(
  "QuarterlyExpenditureStatementOnCapitalEquipment",
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
  },
  {
    timestamps: true,
  }
);

export { EquipmentDetail, QuarterlyExpenditureStatementOnCapitalEquipment };

QuarterlyExpenditureStatementOnCapitalEquipment.hasMany(EquipmentDetail, {
  foreignKey: "statementId",
  as: "equipmentDetails",
});
EquipmentDetail.belongsTo(QuarterlyExpenditureStatementOnCapitalEquipment, {
  foreignKey: "statementId",
  as: "statement",
});
