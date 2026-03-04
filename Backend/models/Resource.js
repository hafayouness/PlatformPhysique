import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Resource = sequelize.define("Resource", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  type: {
    type: DataTypes.ENUM("pdf", "video", "exercise", "solution", "resume"),
    allowNull: false,
  },
  fileUrl: { type: DataTypes.STRING, allowNull: false },
  courseId: { type: DataTypes.INTEGER, allowNull: false },

  linkedResourceId: { type: DataTypes.INTEGER, allowNull: true },

  order: { type: DataTypes.INTEGER, defaultValue: 0 },

  isFree: { type: DataTypes.BOOLEAN, defaultValue: true },
});

export default Resource;
