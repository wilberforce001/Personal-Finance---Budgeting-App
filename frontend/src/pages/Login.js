import { useState } from "react";
import API from "../services/api";

export default function Login() {
    const [form, setForm] = useState({ email:"", password: "" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/api/users/login", form);
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            window.location.href = "/dashboard";
        } catch (err) {
            alert(err.response?.data?.message || "login failed");
        }
    };

    return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>  
    );
}