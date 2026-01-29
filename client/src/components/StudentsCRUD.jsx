import React, { useState } from 'react';
import styles from '../styles/StudentCRUD.module.css';
import Navbar from './Utility';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;

const URL = `${API}/student`;

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    faculty: 'CSIT',
    semester: '1' // Added semester field
  });

  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic Validation
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.contactNumber) newErrors.contactNumber = 'Contact Number is required';
    if (!formData.semester) newErrors.semester = 'Semester is required'; // Semester validation
    if (!formData.faculty) newErrors.faculty = 'Faculty is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      setResponseMessage('');

      // Make POST request to add student
      const response = await axios.post(`${URL}/add`, formData);
      
      if (response.status === 201) {
        setResponseMessage(response.data.message);  // Success message
        setFormData({
          name: '',
          email: '',
          contactNumber: '',
          faculty: 'CSIT',
          semester: '1'
        });
        setErrors({});
      }
    } catch (err) {
      // Handle error response
      if (err.response) {
        setResponseMessage(err.response.data.message); // Error message from server
      } else {
        setResponseMessage('An unexpected error occurred');
      }
      console.log(err); // Log error for debugging
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className={styles.container}>
      <Navbar title="Add student" />

      <main className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${errors.name ? styles.errorInput : ''}`}
              placeholder="Enter full name"
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.errorInput : ''}`}
              placeholder="Enter email address"
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contactNumber" className={styles.label}>
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className={`${styles.input} ${errors.contactNumber ? styles.errorInput : ''}`}
              placeholder="Enter contact number"
              pattern="[0-9]{10}"
              title="10 digit phone number"
            />
            {errors.contactNumber && (
              <span className={styles.errorText}>{errors.contactNumber}</span>
            )}
          </div>

          {/* Semester Field */}
          <div className={styles.formGroup}>
            <label htmlFor="semester" className={styles.label}>
              Semester
            </label>
            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className={`${styles.select} ${errors.semester ? styles.errorInput : ''}`}
            >
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={`${i + 1}`}>
                  {i + 1}
                </option>
              ))}
            </select>
            {errors.semester && <span className={styles.errorText}>{errors.semester}</span>}
          </div>

          {/* Faculty Field */}
          <div className={styles.formGroup}>
            <label htmlFor="faculty" className={styles.label}>
              Faculty
            </label>
            <select
              id="faculty"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="CSIT">CSIT</option>
              <option value="BCA">BCA</option>
              <option value="BIM">BIM</option>
            </select>
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Student'}
            </button>
          </div>
        </form>

        {/* Displaying Response Message */}
        {responseMessage && (
          <div className={`${styles.responseMessage} ${responseMessage.includes('successfully') ? styles.success : styles.error}`}>
            {responseMessage}
          </div>
        )}
      </main>
    </div>
  );
};

export default AddStudent;
