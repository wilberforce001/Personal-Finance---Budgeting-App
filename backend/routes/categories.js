import express from "express";
import { addCategory, getCategories, deleteCategory, updateCategory } from "../controllers/categoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, addCategory);
router.get("/", authMiddleware, getCategories);
router.delete("/:id", authMiddleware, deleteCategory);
router.put("/:id", authMiddleware, updateCategory);


// POST /api/categories → Add

// GET /api/categories → List

// DELETE /api/categories/:id → Delete

// PUT /api/categories/:id → Update

export default router;

