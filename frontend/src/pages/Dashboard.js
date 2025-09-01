import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await API.get("/api/categories");
        setCategories(data);
      } catch (err) {
        console.error(err.response.data?.message || "Error fetching categories");
        setError(err.response?.data?.message || "Error fetching categories");
      }
    };
    fetchCategories();
  }, []);

  if (error) {
    return <div className="p-4 text-red-600">⚠️ {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <h2 className="text-xl mb-2">Your Categories</h2>
      {categories.length === 0 ? (
        <p>No categories yet</p>
      ) : (
        <ul className="list-disc pl-6">
          {categories.map((c) => (
            <li key={c._id}>{c.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
