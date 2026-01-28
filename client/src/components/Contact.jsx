import { useState } from "react";
import styles from "../styles/contact.module.css";
import Navbar from "./Utility";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <Navbar title="" />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Contact Us</h1>
          <p>Have questions or need support? Reach out to our team.</p>
        </div>

        <div className={styles.content}>
          {/* Info Section */}
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <i className="fas fa-envelope"></i>
              <h3>Email</h3>
              <p>support@studentmanagementsystem.com</p>
            </div>

            <div className={styles.infoCard}>
              <i className="fas fa-phone"></i>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>

            <div className={styles.infoCard}>
              <i className="fas fa-map-marker-alt"></i>
              <h3>Address</h3>
              <p>123 Education Street, Campus City</p>
            </div>

            <div className={styles.infoCard}>
              <i className="fas fa-clock"></i>
              <h3>Hours</h3>
              <p>Mon–Fri: 9am – 5pm</p>
            </div>
          </div>

          {/* Form Section */}
          <div className={styles.formContainer}>
            <h2>Send us a message</h2>

            {submitted && (
              <div className={styles.success}>
                Thank you! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Message</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
