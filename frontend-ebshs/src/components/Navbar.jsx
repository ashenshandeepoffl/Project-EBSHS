import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi'; // Icons for light/dark mode toggle
import { Link } from 'react-router-dom';

const Navbar = ({ toggleDarkMode, darkMode }) => {
    return (
        <nav className="flex justify-between items-center p-6 font-sans">
            <div className="flex items-center space-x-3">
                <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-white hover:text-blue-400 transition-colors duration-300">
                    FeelHome AI
                </Link>
            </div>
            <div className="flex items-center space-x-8">
                <Link to="/login" className="text-lg font-medium hover:text-blue-600 dark:text-white transition-colors duration-300">
                    Login
                </Link>
                <Link to="/register" className="text-lg font-medium hover:text-blue-600 dark:text-white transition-colors duration-300">
                    Register
                </Link>

                {/* Dark Mode Toggle */}
                <button onClick={toggleDarkMode} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full transition duration-300">
                    {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-blue-500" />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
