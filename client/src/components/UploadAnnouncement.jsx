import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Announcement.module.css';
import Navbar from './Utility';

const SendAnnouncement = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('all');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const token = localStorage.getItem('token'); // If your API requires auth
      const response = await axios.post(
        'http://localhost:3000/api/notice/announcements',
        {
          title: subject,
          body: message,
          // Optional: audience field if backend supports it
          // audience,
          date: new Date(), // current date
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccessMsg('Announcement uploaded successfully!');
      setSubject('');
      setMessage('');
      setAudience('all');
      console.log('Announcement response:', response.data);
    } catch (error) {
      console.error('Error sending announcement:', error);
      setErrorMsg(
        error.response?.data?.message || 'Failed to upload announcement.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar title="Upload Announcement" />

      <main className={styles.mainContent}>
        <form onSubmit={handleSend} className={styles.form}>
          {successMsg && <p className={styles.successMsg}>{successMsg}</p>}
          {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}

          <div className={styles.formGroup}>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.textarea}
              rows={6}
              required
            />
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.primaryButton}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Announcement'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SendAnnouncement;
