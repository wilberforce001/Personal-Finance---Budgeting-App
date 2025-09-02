import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Transaction from "../models/Transaction.js";
import Category from "../models/Category.js";

const router = express.Router();

router.get("/summary", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch transactions for this user
        const transactions = await Transaction.find({ user: userId }).sort({ date: -1 });

        // Calculate totals
        const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

        const expenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

        const balance = income - expenses;

        // Categories
        const categoriesCount = await Category.countDocuments({ user: userId });

        // Recent transactions (Limit to 5)
        const recentTransactions = transactions.slice(0, 5);

        res.json({
            summary: {
                balance,
                income,
                expenses,
                categoriesCount,
            },
            recentTransactions
        });
    } catch (err) {
        console.error("Error in dashboard summary:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;