import React, { useState, useEffect } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { motion } from 'framer-motion';
import Navbar from './Navbar'; 
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    gender: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    // mobileNumber: '',
    securityQuestion: '',
    securityAnswer: '',
  });
  
  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(true);
  const [suggestions, setSuggestions] = useState([]); // Suggestions for username
  const [alertMessage, setAlertMessage] = useState(null);  // State for alert message
  const [alertType, setAlertType] = useState(null);        // Type: 'success' or 'error'
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password visibility
  const navigate = useNavigate(); // Initialize useNavigate
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  // Enable dark mode by default
  useEffect(() => {
      if (darkMode) {
          document.documentElement.classList.add('dark');
      } else {
          document.documentElement.classList.remove('dark');
      }
  }, [darkMode]);

  const toggleDarkMode = () => {
      setDarkMode(!darkMode);
  };

   // Password validation logic
   const validatePassword = (password) => {
    const newValidation = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    };
    setPasswordValidation(newValidation);
    return Object.values(newValidation).every(Boolean); // Return true if all are valid
  };
  
  const securityQuestions = [
    'What is your mother’s maiden name?',
    'What was your first pet’s name?',
    'What was the name of your first school?',
    'What city were you born in?',
  ];

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required.';
    if (!formData.lastName) newErrors.lastName = 'Last name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.username) newErrors.username = 'Username or Email is required.';
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password does not meet the requirements.';
    }
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (!formData.birthday) newErrors.birthday = 'Birthday is required.';
    if (!formData.country) newErrors.country = 'Country is required.';
    if (!formData.city) newErrors.city = 'City is required.';
    // if (!formData.mobileNumber || formData.mobileNumber.length < 10) newErrors.mobileNumber = 'Enter a valid mobile number.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });  // Scroll to top on submit

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setAlertMessage('Registration successful!');
          setAlertType('success');
          setFormData({  // Clear the form on successful registration
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            birthday: '',
            gender: '',
            address: '',
            city: '',
            postalCode: '',
            country: '',
            securityQuestion: '',
            securityAnswer: '',
          });
          setTimeout(() => {
            navigate('/login');  // Redirect after success
          }, 2000);  // Redirect after 2 seconds
        } else if (response.status === 409) {
          const errorData = await response.json();
          setErrors({
            email: errorData.emailError || '',
            username: errorData.usernameError || '',
          });
          if (errorData.suggestions) {
            setSuggestions(errorData.suggestions);  // Set username suggestions if available
          }
        }
      } catch (error) {
        console.error('Error:', error);
        setAlertMessage('An error occurred while submitting the form.');
        setAlertType('error');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') validatePassword(value); // Trigger dynamic password validation
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-500`}>
  {/* Navbar */}
  <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

  {alertMessage && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`max-w-xl mx-auto mt-4 p-4 rounded-md shadow-lg text-center ${alertType === 'success' ? 
        (darkMode ? 'bg-green-600 text-white' : 'bg-green-100 text-green-900') :
        (darkMode ? 'bg-red-600 text-white' : 'bg-red-100 text-red-900')}`}
    >
      {alertMessage}
    </motion.div>
  )}

  <motion.form
    onSubmit={handleSubmit}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className={`max-w-xl mx-auto p-6 mt-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg shadow-md`}
  >
    <h2 className="text-3xl font-semibold mb-6 text-center">Register</h2>

    {/* First Name */}
    <div className="mb-4">
      <label className="block text-sm font-medium">
        First Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
        required
      />
      {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
    </div>

    {/* Last Name */}
    <div className="mb-4">
      <label className="block text-sm font-medium">
        Last Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
        required
      />
      {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
    </div>

    {/* Email */}
    <div className="mb-4">
      <label className="block text-sm font-medium">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
        required
      />
      {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
    </div>

    {/* Username */}
    <div className="mb-4">
      <label className="block text-sm font-medium">
        Username <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
        required
      />
      {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}

      {/* Display username suggestions if the username is taken */}
      {suggestions.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-gray-200">Try one of these available usernames:</p>
          <ul className="list-disc list-inside">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-gray-100">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>


    {/* Password */}
    <div className="mb-4">
      <label className="block text-sm font-medium">
        Password <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
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
      {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}

      {/* Dynamic password requirements */}
      <div className="mt-2">
        <p className={`text-sm ${passwordValidation.length ? 'text-green-600' : 'text-red-500'}`}>
          {passwordValidation.length ? '✔' : '✘'} At least 8 characters
        </p>
        <p className={`text-sm ${passwordValidation.uppercase ? 'text-green-600' : 'text-red-500'}`}>
          {passwordValidation.uppercase ? '✔' : '✘'} At least one uppercase letter
        </p>
        <p className={`text-sm ${passwordValidation.lowercase ? 'text-green-600' : 'text-red-500'}`}>
          {passwordValidation.lowercase ? '✔' : '✘'} At least one lowercase letter
        </p>
        <p className={`text-sm ${passwordValidation.number ? 'text-green-600' : 'text-red-500'}`}>
          {passwordValidation.number ? '✔' : '✘'} At least one number
        </p>
        <p className={`text-sm ${passwordValidation.specialChar ? 'text-green-600' : 'text-red-500'}`}>
          {passwordValidation.specialChar ? '✔' : '✘'} At least one special character (@$!%*?&)
        </p>
      </div>
    </div>

    {/* Confirm Password */}
    <div className="mb-4">
      <label className="block text-sm font-medium">
        Confirm Password <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
    </div>

    {/* Birthday */}
    <div className="mb-4">
      <label className="block text-sm font-medium">
        Birthday <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        name="birthday"
        value={formData.birthday}
        onChange={handleChange}
        className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
        required
      />
      {errors.birthday && <span className="text-red-500 text-sm">{errors.birthday}</span>}
    </div>

    {/* Gender */}
    <div className="mb-4">
      <label className="block text-sm font-medium">Gender</label>
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>

    {/* Address */}
    <div className="mb-4">
      <label className="block text-sm font-medium">Address</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
      />
    </div>

    {/* Country */}
    <div className="mb-4">
      <label className="block text-sm font-medium">
        Country <span className="text-red-500">*</span>
      </label>
      <CountryDropdown
        value={formData.country}
        onChange={(val) => setFormData({ ...formData, country: val })}
        className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
        required
      />
      {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
    </div>

    {/* City */}
    <div className="mb-4">
      <label className="block text-sm font-medium">
        City <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
        required
      />
      {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
    </div>

    {/* Postal Code */}
    <div className="mb-4">
      <label className="block text-sm font-medium">Postal Code</label>
      <input
        type="text"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
      />
    </div>

    {/* Mobile Number */}
    {/* <div className="mb-4">
      <label className="block text-sm font-medium">
        Mobile Number <span className="text-red-500">*</span>
      </label>
      <PhoneInput
        placeholder="Enter phone number"
        value={formData.mobileNumber}
        onChange={(val) => setFormData({ ...formData, mobileNumber: val })}
        className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500'}`}
        required
      />
      {errors.mobileNumber && <span className="text-red-500 text-sm">{errors.mobileNumber}</span>}
    </div> */}

    {/* Security Question */}
    <div className="mb-4">
      <label className="block text-sm font-medium">Security Question</label>
      <select
        name="securityQuestion"
        value={formData.securityQuestion}
        onChange={handleChange}
        className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
      >
        <option value="">Select a Security Question</option>
        {securityQuestions.map((question, index) => (
          <option key={index} value={question}>
            {question}
          </option>
        ))}
      </select>
    </div>

    {/* Security Answer */}
    <div className="mb-4">
      <label className="block text-sm font-medium">Security Answer</label>
      <input
        type="text"
        name="securityAnswer"
        value={formData.securityAnswer}
        onChange={handleChange}
        className={`mt-1 block w-full border rounded-md p-2 focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300"
    >
      Register
    </button>
  </motion.form>

  {/* Footer */}
  <footer className="mt-6 p-4 text-center text-sm">
    <p>© {new Date().getFullYear()} Ashen. All rights reserved.</p>
    <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
  </footer>

</div>

  );
}
