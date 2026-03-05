import sequelize from "../config/database.js";
import User from "./User.js";
import Course from "./Course.js";
import Resource from "./Resource.js";
import NationalExam from "./Nationalexamen.js";

Course.hasMany(Resource, {
  foreignKey: "courseId",
  as: "resources",
  onDelete: "CASCADE",
});
Resource.belongsTo(Course, { foreignKey: "courseId", as: "course" });

Resource.belongsTo(Resource, {
  foreignKey: "linkedResourceId",
  as: "linkedResource",
});

export default { sequelize, User, Course, Resource, NationalExam };
