import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    const [open, setOpen] = useState(true);

    return (
        <aside className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform
        ${open ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition duration-200 ease-in-out
        `}>
            <button onClick={() => setOpen(!open)}
                className="md:hidden mb-4 px-2 py-1 bg-gray-700 rounded"
                > {open ? "close" : "Menu"}
            </button>

            <nav>
                <Link to="/" className="block py-2.5 px-4 rounded hover:bg-gray-700">Home</Link>
                <Link to="/categories" className="block py-2.5 px-4 rounded hover:bg-gray-700">Categories</Link>
                <Link to="/transactions" className="block py-2.5 px-4 rounded hover:bg-gray-700">Transactions</Link>
            </nav>
        </aside>
    )
}

export default Sidebar;