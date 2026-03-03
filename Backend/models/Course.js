import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Course = sequelize.define("Course", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  level: { type: DataTypes.ENUM("1bac", "2bac"), allowNull: false },
  chapter: { type: DataTypes.STRING, allowNull: false },
  filiere: {
    type: DataTypes.ENUM("SP", "SVT", "SMA", "SMB", "ALL"),
    allowNull: false,
    defaultValue: "ALL",
  },
});

export default Course;
