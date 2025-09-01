import Transaction from "../models/Transaction";
import Category from "../models/Category"

// Dashboard summary 
export const getDashboardSummary = async (req, res) => {
    try {
        const userId = req.user.id;
        const totalTransactions = await Transaction.countDocuments({ user: userId });
        const totalCategories = await Category.countDocuments({ user: userId });

        res.json({ 
            totalCategories,
            totalTransactions,
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}