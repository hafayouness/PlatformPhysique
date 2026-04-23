import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIELD_TO_DIR = {
  subjectPdf: "subjectPdf",
  solutionPdf: "solutionPdf",
  solutionVideo: "solutionVideo",
  pdf: "pdf",
  video: "video",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = FIELD_TO_DIR[file.fieldname] || "misc";
    const dir = path.join(__dirname, "..", "uploads", folder);

    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["application/pdf", "video/mp4", "video/webm", "video/ogg"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Type de fichier non supporté. Utilisez PDF ou vidéo."),
      false,
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 },
});

export default upload;
