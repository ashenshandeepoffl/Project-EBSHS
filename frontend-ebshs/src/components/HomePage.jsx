import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // For smooth animations
import NavBarHome from './NavBarHome'; // Adjust import if necessary

export default function Home() {
  const [message, setMessage] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/home', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 401) {
          navigate('/login'); // Redirect to login if unauthorized
        } else {
          const data = await response.json();
          setMessage(data.message);
          setProfilePicture(data.profilePicture);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} transition-colors duration-500`}>
      {/* Navbar */}
      <NavBarHome toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md md:max-w-lg lg:max-w-xl mx-auto p-6 mt-20 text-center"
      >
        {/* Profile Picture */}
        {profilePicture && (
          <motion.img
            src={profilePicture}
            alt="Profile"
            className="h-24 w-24 rounded-full mx-auto mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        {/* Welcome Message */}
        <h2 className="text-4xl font-semibold mb-6">Welcome</h2>

        {/* Display Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-6 text-lg"
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  );
}
