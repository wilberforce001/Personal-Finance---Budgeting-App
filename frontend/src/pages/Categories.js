import React, { useState, useEffect } from "react";
import API from "../services/api";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");

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

    return (
        <div>
            <h2>Categories</h2>

            <form onSubmit={addCategory}>
                <input
                type="text"
                placeholder="Category name"
                value={name}
                onChange={(e) => setName(e.target.value)} required
                />
                <button type="submit">Add</button>
            </form>

            <ul>
                {categories.map((cat) => (
                    <li key={cat._id}>{cat.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;