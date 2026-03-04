import express from "express";
import {
  getResourcesByCourse,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/ResourceController.js";
import { protect, authorize } from "../middleware/Authmiddleware.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.get("/course/:courseId", getResourcesByCourse);
router.get("/single/:id", getResourceById);

router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("file"),
  createResource,
);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("file"),
  updateResource,
);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("file"),
  deleteResource,
);

export default router;
