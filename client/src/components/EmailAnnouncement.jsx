import React, { useState } from 'react';
import '../styles/EmailAnnouncement.css'
import Navbar from './Utility';
const EmailAnnouncement = () => {
 // Sample email list (replace with your actual emails)
 const initialEmails = [
    { id: 1, address: 'user1@example.com', checked: false },
    { id: 2, address: 'user2@example.com', checked: false },
    { id: 3, address: 'user3@example.com', checked: false },
    { id: 4, address: 'user4@example.com', checked: false },
    { id: 5, address: 'user5@example.com', checked: false },
    { id: 6, address: 'user6@example.com', checked: false },
    { id: 7, address: 'user7@example.com', checked: false },
    { id: 8, address: 'user8@example.com', checked: false },
    { id: 9, address: 'user9@example.com', checked: false },
    { id: 10, address: 'user10@example.com', checked: false },
  ];

  const [emails, setEmails] = useState(initialEmails);
  const [message, setMessage] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Handle individual email checkbox change
  const handleEmailCheck = (id) => {
    const updatedEmails = emails.map(email => 
      email.id === id ? { ...email, checked: !email.checked } : email
    );
    setEmails(updatedEmails);
    setSelectAll(updatedEmails.every(email => email.checked));
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    const updatedEmails = emails.map(email => ({
      ...email,
      checked: !selectAll
    }));
    setEmails(updatedEmails);
    setSelectAll(!selectAll);
  };

  // Handle message input change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle form submission
  const sendEmails = async (e) => {
    e.preventDefault();
    setIsSending(true);
    
    // Get selected emails
    const selectedEmails = emails.filter(email => email.checked);
    
    // Simulate API call (replace with actual API request)
    setTimeout(() => {
      console.log('Sending message to:', selectedEmails.map(e => e.address));
      console.log('Message content:', message);
      setIsSending(false);
      alert('Announcement sent successfully!');
      setMessage('');
      setEmails(initialEmails);
      setSelectAll(false);
    }, 2000);
  };
  return (
    <>
    <Navbar title=' Email Announcement'/>
    <div className="email-announcement-container">
      <h1 className="announcement-title">Send Announcement</h1>
      
      <div className="recipients-section">
        <h2 className="recipients-title">Recipients</h2>
        <div className="recipients-list">
          <label className="select-all-label">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="checkbox-input"
            />
            <span className="email-address">Select All</span>
          </label>
          
          <div className="email-list">
            {emails.map((email) => (
              <label
                key={email.id}
                className="email-item"
              >
                <input
                  type="checkbox"
                  checked={email.checked}
                  onChange={() => handleEmailCheck(email.id)}
                  className="checkbox-input"
                />
                <span className="email-address">{email.address}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="message-section">
        <label className="message-label">
          Announcement Message
        </label>
        <textarea
          value={message}
          onChange={handleMessageChange}
          className="message-textarea"
          placeholder="Write your announcement message here..."
        />
      </div>

      <button
        onClick={sendEmails}
        disabled={isSending || !message || !emails.some(e => e.checked)}
        className="submit-button"
      >
        {isSending ? 'Sending...' : 'Send Announcement'}
      </button>
    </div>
    </>
  );
};

export default EmailAnnouncement;