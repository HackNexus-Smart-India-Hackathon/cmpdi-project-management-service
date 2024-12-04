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
      // Optional if you plan to calculate it on the frontend
      type: DataTypes.FLOAT,
      allowNull: true, // Make it optional for frontend calculation
    },
    approvedCost: {
      // Optional if you plan to calculate it on the frontend
      type: DataTypes.FLOAT,
      allowNull: true, // Make it optional for frontend calculation
    },
    progressiveExpenditure: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    statementId: {
      // Foreign key linking to the statement
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "QuarterlyExpenditureStatementOnCapitalEquipments", // name of the statement table
        key: "id",
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
    timestamps: true, // to store the time when a statement is created
  }
);

export { EquipmentDetail, QuarterlyExpenditureStatementOnCapitalEquipment };

// Define associations
QuarterlyExpenditureStatementOnCapitalEquipment.hasMany(EquipmentDetail, {
  foreignKey: "statementId", // reference to statement
  as: "equipmentDetails", // alias for easier referencing in the model
});
EquipmentDetail.belongsTo(QuarterlyExpenditureStatementOnCapitalEquipment, {
  foreignKey: "statementId", // reference to statement
  as: "statement", // alias for easier referencing
});
