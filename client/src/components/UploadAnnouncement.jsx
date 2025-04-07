import React, { useState } from 'react';
import styles from '../styles/Announcement.module.css';
import Navbar from './Utility';

const SendAnnouncement = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('all');

  const handleSend = (e) => {
    e.preventDefault();
    console.log({ subject, message, audience });    
    setSubject('');
    setMessage('');
    setAudience('all');
  };

  return (
    <div className={styles.container}>
     <Navbar title='Upload Announcement'/>

      <main className={styles.mainContent}>
        <form onSubmit={handleSend} className={styles.form}>
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
            <div className={styles.editorContainer}>
              {/* <div className={styles.toolbar}> */}
                {/* <button type="button" className={styles.toolButton}>
                  <span className={styles.bold}>B</span>
                </button>
                <button type="button" className={styles.toolButton}>
                  <span className={styles.italic}>I</span>
                </button>
                <button type="button" className={styles.toolButton}>
                  <span className={styles.list}>•</span>
                </button>
              </div> */}
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={styles.textarea}
                rows={6}
                required
              />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.primaryButton}>
              Upload Announcement
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SendAnnouncement;