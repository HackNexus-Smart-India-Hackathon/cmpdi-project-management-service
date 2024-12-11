import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const Deadline = sequelize.define(
   "Deadlines" , 
   {
      id : {
         type : DataTypes.INTEGER,
         autoIncrement : true,
         primaryKey : true,
      },
      startDate : {
         type : DataTypes.STRING,
         allowNull : false
      },
      description : {
         type : DataTypes.STRING , 
         allowNull : false
      },
      deadline : {
         type : DataTypes.DATE,
         allowNull : false
      },
      notified : {
         type : DataTypes.BOOLEAN,
         defaultValue : false
      },
      investigators_email : {
         type : DataTypes.ARRAY(DataTypes.STRING),
         allowNull : false
      },
      projectId : {
         type : DataTypes.STRING,
         allowNull : false
      }
   }
)

export default Deadline