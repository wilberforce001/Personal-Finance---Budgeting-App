import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Navbar from "./components/Navbar";
import Transactions from "./pages/Transaction";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirect root to "/" to login */}
        <Route path="/" element={<Navigate to="/login" /> } />

        {/* Auth pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/transactions" element={<Transactions />}/>
      </Routes>
    </Router>
  );
}

export default App;
