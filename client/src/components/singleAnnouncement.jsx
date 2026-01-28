import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/singleAnnoun.module.css';
import Navbar from './Utility';

const SingleAnnouncement = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/notice/announcements/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnnouncement(response.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch announcement');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [id]);

  if (loading) return <p>Loading announcement...</p>;
  if (error) return <p>{error}</p>;
  if (!announcement) return <p>No announcement found.</p>;

  return (
    <div className={styles.container}>
      <Navbar title="Announcement Details" />

      <main className={styles.mainContent}>
        <h2 className={styles.title}>{announcement.title}</h2>
        <p className={styles.date}>{new Date(announcement.date).toLocaleDateString()}</p>
        <p className={styles.body}>{announcement.body}</p>
                <Link to="/dashboard" className={styles.backLink}>← Back to Dashboard</Link>

      </main>
    </div>
  );
};

export default SingleAnnouncement;
