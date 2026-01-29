// src/components/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Utility";
import { Unauthorize } from "./Utility";
import "../styles/Home.css";
const API = import.meta.env.VITE_API_URL;

const Button = ({ text, link }) => (
  <Link to={link}>
    <button className="action-btn">
      <i className="fas fa-envelope"></i> {text}
    </button>
  </Link>
);

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats] = useState({
    totalStudents: 2,
    newMessages: 1,
  });
  const [recentAnnouncements, setRecentAnnouncements] = useState([]);

  const user = {
    name: "Bibek",
    profilePic: "",
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (token) {
      axios
        .get(`${API}/api/notice/announcements`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setRecentAnnouncements(res.data))
        .catch((err) => console.error("Error fetching announcements:", err));
    }
  }, []);

  if (!isAuthenticated) return <Unauthorize />;

  return (
    <div className="home-container">
      {/* Navbar */}
      <Navbar
        title="Student Dashboard"
        user={user}
        notifications={stats.newMessages}
      />

      {/* Main Dashboard Content */}
      <main className="main-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-user-graduate"></i>
            </div>
            <div className="stat-info">
              <h3>Total Students</h3>
              <p>{stats.totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="content-grid">
          <section className="announcements-section">
            <div className="section-header">
              <h2>Recent Announcements</h2>
              <Link to="/announcements" className="view-all">
                View All
              </Link>
            </div>
            <div className="announcements-list">
              {recentAnnouncements.length === 0 ? (
                <p className="no-data">No announcements available.</p>
              ) : (
                recentAnnouncements.map((a) => (
                  <div key={a._id} className="announcement-card">
                    <div className="announcement-date">
                      {new Date(a.date).toLocaleDateString()}
                    </div>
                    <h4 className="announcement-title">{a.title}</h4>
                    <Link
                      to={`/announcements/${a._id}`}
                      className="read-more"
                    >
                      Read More <i className="fas fa-chevron-right"></i>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </section>

          <aside className="quick-actions">
            <div className="section-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="action-buttons">
              <Button text="Add New Student" link="/addstudent" />
              <Button text="Send Announcement" link="/addannouncement" />
              <Button text="Send Email-Announcement" link="/announcement" />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Home;
