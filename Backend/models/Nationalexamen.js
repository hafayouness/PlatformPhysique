import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const NationalExam = sequelize.define("NationalExam", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  filiere: {
    type: DataTypes.ENUM("SP", "SVT", "SMA", "SMB"),
    allowNull: false,
  },
  session: {
    type: DataTypes.ENUM("normale", "rattrapage"),
    defaultValue: "normale",
  },

  subjectPdfUrl: { type: DataTypes.STRING, allowNull: true },

  solutionPdfUrl: { type: DataTypes.STRING, allowNull: true },

  solutionVideoUrl: { type: DataTypes.STRING, allowNull: true },

  isFree: { type: DataTypes.BOOLEAN, defaultValue: true },
});

export default NationalExam;
