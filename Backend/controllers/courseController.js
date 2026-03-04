import Course from "../models/Course.js";
import Resource from "../models/Resource.js";

export const getAllCourses = async (req, res) => {
  try {
    const where = {};
    if (req.query.level) where.level = req.query.level;
    if (req.query.filiere) where.filiere = req.query.filiere;

    const courses = await Course.findAll({
      where,
      include: [
        { model: Resource, as: "resources", attributes: ["id", "type"] },
      ],
      order: [["chapter", "ASC"]],
    });

    const result = courses.map((c) => {
      const obj = c.toJSON();
      obj.resourceCount = {
        pdf: obj.resources.filter((r) => r.type === "pdf").length,
        video: obj.resources.filter((r) => r.type === "video").length,
        exercise: obj.resources.filter((r) => r.type === "exercise").length,
        solution: obj.resources.filter((r) => r.type === "solution").length,
        resume: obj.resources.filter((r) => r.type === "resume").length,
      };
      delete obj.resources;
      return obj;
    });

    return res.json(result);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: Resource,
          as: "resources",
          include: [
            {
              model: Resource,
              as: "linkedResource",
              attributes: ["id", "title", "fileUrl", "type"],
            },
          ],
          order: [["order", "ASC"]],
        },
      ],
    });
    if (!course) return res.status(404).json({ message: "Cours introuvable" });
    return res.json(course);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
};

export const createCourse = async (req, res) => {
  const { title, description, level, chapter, filiere } = req.body;
  try {
    if (!title || !level || !chapter || !filiere)
      return res
        .status(400)
        .json({ message: "title, level, chapter et filiere sont requis" });

    const course = await Course.create({
      title,
      description,
      level,
      chapter,
      filiere,
    });
    return res.status(201).json(course);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: "Cours introuvable" });
    await course.update(req.body);
    return res.json(course);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: "Cours introuvable" });
    await course.destroy();
    return res.json({ message: "Cours supprimé" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
};
