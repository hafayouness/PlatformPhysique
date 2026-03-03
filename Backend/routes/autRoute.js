import expres from "express";
import {
  login,
  register,
  logout,
  getMe,
  updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/Authmiddleware.js";

const router = expres.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);
router.put("/profile/:id", protect, updateProfile);
