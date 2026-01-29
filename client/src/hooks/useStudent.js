// src/hooks/useStudents.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API}/student/all`);
        if (Array.isArray(response.data.Student)) {
          setStudents(response.data.Student);
        } else {
          setError('Invalid data format received');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return { students, loading, error };
};

export default useStudents;