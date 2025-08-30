import express from "express";
import { addCategory, getCategories, deleteCategory } from "../controllers/categoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All category routes are protected
router.post("/", authMiddleware, addCategory);
router.get("/", authMiddleware, getCategories);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;