import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";


const NavigationBar = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();

    // Scroll hide/show logic
    const handleScroll = useCallback(() => {
        if (window.scrollY > lastScrollY) {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
        }
        setLastScrollY(window.scrollY);
    }, [lastScrollY]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Check login
    const isAuthenticated = !!localStorage.getItem("token");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login"); // redirect if not logged in
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav className={`bg-gray-800 p-4 flex justify-between items-center transition-transform duration-300 ${
      showNavbar ? "translate-y-0" : "-translate-y-full"
    }`}>
                {/* Nav Links */}
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/categories" className="text-gray-300 hover:text-white">Categories</Link>
                    </li>
                </ul>

                {/* Logout button */}
                <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Logout
                </button>
        </nav>
    )
}

export default NavigationBar;