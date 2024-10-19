import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/check_session', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          // User is logged in, redirect to home page
          navigate('/home');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/home'); // Redirect to home after successful login
      } else {
        const data = await response.json();
        setError(data.error); // Handle error message
      }
    } catch (error) {
      setError('An error occurred during login.');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-500`}>
      {/* Navbar */}
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`max-w-md md:max-w-lg lg:max-w-xl mx-auto p-6 mt-20 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg shadow-md`}
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>

        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Username</label>
          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
            required
          />
        </div>

        {/* Password Input with Show/Hide Functionality */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
            <motion.input
              whileFocus={{ scale: 1.03 }}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-red-500 text-sm mb-4"
          >
            {error}
          </motion.p>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300"
        >
          Login
        </motion.button>
      </motion.form>
    </div>
  );
}
