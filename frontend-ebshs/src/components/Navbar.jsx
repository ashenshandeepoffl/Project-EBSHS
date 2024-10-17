import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi'; // Icons for light/dark mode toggle
import { Link } from 'react-router-dom';

const Navbar = ({ toggleDarkMode, darkMode }) => {
    return (
        <nav className={`flex justify-between items-center p-6 font-sans ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
            <div className="flex items-center space-x-3">
                <Link to="/" className={`text-2xl font-bold hover:text-blue-400 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    FeelHome AI
                </Link>
            </div>
            <div className="flex items-center space-x-8">
                <Link to="/login" className={`text-lg font-medium hover:text-blue-600 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Login
                </Link>
                <Link to="/register" className={`text-lg font-medium hover:text-blue-600 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
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
