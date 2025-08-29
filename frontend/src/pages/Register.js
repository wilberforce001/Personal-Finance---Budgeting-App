import { useState } from "react";
import API from "../services/api";

export default function Register() {
    const [form, setForm] = useState({ firstName: "", secondName: "", password: "" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/api/users/register", form);
            alert("User registered! Now login.");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <input name="secondName" placeholder="Second Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
    );
}