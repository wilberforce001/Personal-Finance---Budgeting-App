import mongoose from "mongoose"

const categorySchema = new mongoose.Schema (
    {
    name: {type: String, required: true},
    type: { type: String, enum: ['income', 'expense'], required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;