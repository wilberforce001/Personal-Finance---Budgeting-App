import React from "react";

const Navbar = () => {
    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Personal Finance App</h1>
            <div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Profile</button>
            </div>
        </header>
    );
};

export default Navbar;