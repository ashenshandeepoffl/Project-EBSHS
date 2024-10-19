import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarHome from './NavBarHome';
import { motion } from 'framer-motion';
import { FiCamera } from 'react-icons/fi';

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    birthday: '',
    gender: '',
    address: '',
    country: '',
    city: '',
    postalCode: '',
    mobileNumber: '',
    profilePicture: '',
  });
  const [profilePicPreview, setProfilePicPreview] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current user information from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/profile', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          setFormData(data);
          setProfilePicPreview(`http://localhost:5000${data.profilePicture}`);
        } else {
          navigate('/login');
        }
      } catch (error) {
        setError('Error fetching user data');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    for (let key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:5000/updateProfile', {
        method: 'POST',
        body: formDataObj,
        credentials: 'include',
      });
      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        setError('Error updating profile.');
      }
    } catch (error) {
      setError('Error updating profile.');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-500`}>
      <NavBarHome toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto p-6 mt-10 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-semibold text-center mb-6">Profile</h2>

        {/* Profile Picture */}
        <div className="mb-4 text-center">
          <img
            src={profilePicPreview || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="h-24 w-24 rounded-full mx-auto mb-2"
          />
          <label htmlFor="profilePicture" className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300">
            <FiCamera className="mr-2" /> Upload New Picture
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              className="hidden"
              onChange={handleProfilePicChange}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields for user information */}
          {['firstName', 'lastName', 'email', 'username', 'birthday', 'gender', 'address', 'country', 'city', 'postalCode', 'mobileNumber'].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <motion.input
                whileFocus={{ scale: 1.03 }}
                type={field === 'birthday' ? 'date' : 'text'}
                name={field}
                value={formData[field] || ''}
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                required={field !== 'profilePicture'}
              />
            </div>
          ))}

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

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300"
          >
            Update Profile
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
