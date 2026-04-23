import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./config/database.js";
import "./models/index.js";
import authRoute from "./routes/autRoute.js";
import courseRoute from "./routes/CourseRoutes.js";
import resourceRoute from "./routes/ResourceRoute.js";
import ExamenRoute from "./routes/NationalExamRoute.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoute);
app.use("/api/courses", courseRoute);
app.use("/api/resources", resourceRoute);
app.use("/api/exams", ExamenRoute);
app.listen(PORT, async () => {
  await testConnection();
  console.log(`Server is running on port ${PORT}`);
});
