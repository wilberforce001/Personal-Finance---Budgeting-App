import Category from "../models/Category.js";

// @desc Add a new category
// @route POST /api/categories
export const addCategory = async (req, res) => {
    try {
        const { name, type } = req.body;
        const userId = req.user.id; // from auth middleware

        const category = new Category({ name, type, userId });
        const savedCategory = await category.save();

        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Get all categories for a user
// @route GET /api/categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ userId: req.user.id });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Delete a category
// @route DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ 
            _id: req.params.id,
            userId: req.user.id,
         });

         if (!category) {
            return res.status(404).json({ message: "Category not found" });
         }

         res.json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};