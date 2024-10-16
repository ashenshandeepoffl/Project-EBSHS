import React, { useState, useEffect } from 'react';
import { FaFlag } from 'react-icons/fa'; // For country flag
import axios from 'axios'; // For fetching data
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import PhoneInput from 'react-phone-number-input'; // Phone input with country code
import 'react-phone-number-input/style.css'; // CSS for phone input
import { motion } from 'framer-motion'; // For animations

export default function Register() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errors, setErrors] = useState({});

  // Fetch countries
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then((response) => {
        const countryData = response.data.map((country) => ({
          name: country.name.common,
          flag: country.flags.png,
          code: country.cca2, // Country code
        }));
        setCountries(countryData);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!country) newErrors.country = 'Please select your country.';
    if (!city) newErrors.city = 'Please select your city.';
    if (!gender) newErrors.gender = 'Please select your gender.';
    if (!birthday) newErrors.birthday = 'Please enter your birthday.';
    if (!mobileNumber || mobileNumber.length < 10) newErrors.mobileNumber = 'Please enter a valid mobile number.';
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Registration successful!');
      // Submit form data
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Register</h2>

      {/* Username */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input type="text" name="username" className="mt-1 block w-full border rounded-md p-2" required />
      </div>

      {/* Birthday */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Birthday</label>
        <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="mt-1 block w-full border rounded-md p-2" />
        {errors.birthday && <span className="text-red-500 text-sm">{errors.birthday}</span>}
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="mt-1 block w-full border rounded-md p-2">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
      </div>

      {/* Country and City */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1 block w-full border rounded-md p-2">
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
      </div>

      {/* City */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 block w-full border rounded-md p-2" />
        {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
      </div>

      {/* Mobile Number */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
        <PhoneInput
          placeholder="Enter phone number"
          value={mobileNumber}
          onChange={setMobileNumber}
          className="mt-1 block w-full border rounded-md p-2"
        />
        {errors.mobileNumber && <span className="text-red-500 text-sm">{errors.mobileNumber}</span>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300">
        Register
      </button>
    </motion.form>
  );
}
