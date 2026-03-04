import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Course from "../models/Course.js";
import Resource from "../models/Resource.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getResourcesByCourse = async (req, res) => {
  try {
    const { type } = req.query;
    const where = { courseId: res.params.courseId };
    if (type) {
      where.type = type;
    }
    const resources = await Resource.findAll({
      where,
      include: [
        {
          model: Resource,
          as: "linkedResource",
          attributes: ["id", "title", "fileUrl", "type"],
        },
      ],
      order: [["order", "ASC"]],
    });
    return res.json(resources);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch resources", error: error.message });
  }
};

export const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id, {
      include: [
        { model: Resource, as: "linkedResource" },
        { model: Course, as: "course", attributes: ["id", "title", "level"] },
      ],
    });
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    return res.json(resource);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch resource", error: error.message });
  }
};

export const createResource = async (req, res) => {
  try {
    const { title, type, courseId, linkedResourceId, order, isFree } = req.body;

    if (!title || !type || !courseId) {
      return res
        .status(400)
        .json({ message: "title, type et courseId sont requis" });
    }

    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ message: "Cours introuvable" });

    if (!req.file) return res.status(400).json({ message: "Fichier requis" });
    const fileUrl = `/uploads/${type}/${req.file.filename}`;

    const resource = await Resource.create({
      title,
      type,
      fileUrl,
      courseId,
      linkedResourceId: linkedResourceId || null,
      order: order || 0,
      isFree: isFree !== undefined ? isFree : true,
    });

    return res.status(201).json(resource);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create resource", error: error.message });
  }
};

export const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource)
      return res.status(404).json({ message: "Ressource introuvable" });

    if (req.file) {
      const oldPath = path.join(__dirname, "..", resource.fileUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      req.body.fileUrl = `/uploads/${req.body.type || resource.type}/${req.file.filename}`;
    }

    await resource.update(req.body);
    return res.json(resource);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource)
      return res.status(404).json({ message: "Ressource introuvable" });

    const filePath = path.join(__dirname, "..", resource.fileUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await resource.destroy();
    return res.json({ message: "Ressource supprimée" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
};
