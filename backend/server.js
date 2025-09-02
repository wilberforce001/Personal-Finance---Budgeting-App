import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categories.js";
import path from "path";
import { fileURLToPath } from "url";
import dashboardRoutes from "./routes/dashboard.js"

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root API check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API routes
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Serve Frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // Any route not starting with /api should load frontend
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "frontend/build/index.html"))
  );
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
