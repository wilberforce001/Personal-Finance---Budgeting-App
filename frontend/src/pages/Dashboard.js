import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await API.get("/api/categories");
                setCategories(data);
            }  catch (err) {
                console.error(err.response?.data?.message || "Error fetching categories");
            }
        };
        fetchCategories();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Your Categories</h2>
            <ul>
                {categories.map((c) => (
                    <li key={c._id}>{c.name}</li>
                ))}
            </ul>
        </div>
    );
};
