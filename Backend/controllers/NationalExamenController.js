import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import NationalExam from "../models/Nationalexamen.js";

const removeFile = (url) => {
  if (!url) return;
  const p = path.join(__dirname, "..", url);
  if (fs.existsSync(p)) fs.unlinkSync(p);
};

const buildUrl = (file) => `/uploads/${file.fieldname}/${file.filename}`;
export const getAllExams = async (req, res) => {
  try {
    const where = {};
    if (req.query.filiere) where.filiere = req.query.filiere;
    if (req.query.year) where.year = req.query.year;
    if (req.query.session) where.session = req.query.session;

    const exams = await NationalExam.findAll({
      where,
      order: [
        ["year", "DESC"],
        ["filiere", "ASC"],
      ],
    });
    return res.json(exams);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
};

// GET /api/exams/:id
export const getExamById = async (req, res) => {
  try {
    const exam = await NationalExam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ message: "Examen introuvable" });
    return res.json(exam);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
};

export const createExam = async (req, res) => {
  try {
    const { title, year, filiere, session, isFree } = req.body;

    if (!title || !year || !filiere)
      return res
        .status(400)
        .json({ message: "title, year et filiere sont requis" });

    const files = req.files || {};

    const exam = await NationalExam.create({
      title,
      year: parseInt(year),
      filiere,
      session: session || "normale",
      isFree: isFree !== undefined ? isFree : true,
      subjectPdfUrl: files.subjectPdf ? buildUrl(files.subjectPdf[0]) : null,
      solutionPdfUrl: files.solutionPdf ? buildUrl(files.solutionPdf[0]) : null,
      solutionVideoUrl: files.solutionVideo
        ? buildUrl(files.solutionVideo[0])
        : null,
    });

    return res.status(201).json(exam);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
};

export const updateExam = async (req, res) => {
  try {
    const exam = await NationalExam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ message: "Examen introuvable" });

    const updates = { ...req.body };
    const files = req.files || {};

    if (files.subjectPdf) {
      removeFile(exam.subjectPdfUrl);
      updates.subjectPdfUrl = buildUrl(files.subjectPdf[0]);
    }
    if (files.solutionPdf) {
      removeFile(exam.solutionPdfUrl);
      updates.solutionPdfUrl = buildUrl(files.solutionPdf[0]);
    }
    if (files.solutionVideo) {
      removeFile(exam.solutionVideoUrl);
      updates.solutionVideoUrl = buildUrl(files.solutionVideo[0]);
    }

    await exam.update(updates);
    return res.json(exam);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const exam = await NationalExam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ message: "Examen introuvable" });

    // Remove all linked files
    removeFile(exam.subjectPdfUrl);
    removeFile(exam.solutionPdfUrl);
    removeFile(exam.solutionVideoUrl);

    await exam.destroy();
    return res.json({ message: "Examen supprimé" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
};
