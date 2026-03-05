import express from "express";
import { protect, authorize } from "../middleware/Authmiddleware.js";
import upload from "../middleware/upload.js";
import {
  getAllExams,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
} from "../controllers/NationalExamenController.js";
const router = express.Router();

const examUpload = upload.fields([
  { name: "subjectPdf", maxCount: 1 },
  { name: "solutionPdf", maxCount: 1 },
  { name: "solutionVideo", maxCount: 1 },
]);

router.get("/", getAllExams);
router.get("/:id", getExamById);

router.post("/", protect, authorize("admin"), examUpload, createExam);
router.put("/:id", protect, authorize("admin"), examUpload, updateExam);
router.delete("/:id", protect, authorize("admin"), deleteExam);

export default router;
