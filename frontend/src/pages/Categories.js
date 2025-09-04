import React, { useState, useEffect } from "react";
import API from "../services/api";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editName, setEditName] = useState("");
    const [editingId, setEditingId] = useState(null);


    // Fetch categories on mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await API.get("/categories");
            setCategories(res.data);
        } catch (err) {
            console.error("Error fetching categories:", err)
        }
    };

    // Add category
    const addCategory = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/categories", { name });
            setCategories([...categories, res.data]); // append new category
            setName(""); // Clear input
        } catch (err) {
            console.error("Error adding category:", err);
        }
    };

    // Delete category
    const deleteCategory = async (id) => {
        try {
            await API.delete(`/categories/${id}`);
            setCategories(categories.filter((cat) => cat._id !== id));
        } catch (err) {
            console.error("Error deleting category:", err);
        }
    };

    // Start editing
    const startEdit = (cat) => {
        setEditingId(cat._id);
        setEditName(cat.name);
    };

    // Save edit
    const saveEdit = async (id) => {
        try {
            const res = await API.put(`/categories/${id}`, {name: editName});
            setCategories (
                categories.map((cat) => (cat._id === id ? res.data : cat))
            );
            setEditingId(null);
            setEditName("");
        } catch (err) {
            console.error("Error updating category:", err);
        }
    };

    return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        {/* Add Category Form */}
        <form onSubmit={addCategory} className="flex space-x-2 mb-6">
            <input
            type="text"
            placeholder="New category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded flex-1"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Add
            </button>
        </form>

        {/* Categories List */}
        {categories.length === 0 ? (
            <p>No categories yet.</p>
        ) : (
            <ul className="space-y-2">
            {categories.map((cat) => (
                <li key={cat._id} className="p-2 border rounded flex justify-between items-center">
                    {editingId === cat._id ? (
                        <div className="flex space-x-2 flex-1">
                            <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="border p-2 rounded flex-1"
                            />
                            <button onClick={() => saveEdit(cat._id)}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                                >
                                Save
                            </button>
                            <button onClick={() => setEditingId(null)}
                                className="bg-gray-400 text-white px-3 py-1 rounded"
                                >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <>
                        <span>{cat.name}</span>
                        <div className="space-x-2">
                            <button onClick={() => startEdit(cat)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                Edit
                            </button>

                            <button onClick={() => deleteCategory(cat._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                Delete
                            </button>
                        </div>
                        </>
                    )}
                </li>
            ))}
            </ul>
        )}
        </div>
    );
};

export default Categories;