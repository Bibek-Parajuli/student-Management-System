import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { Unauthorize } from "./Utility";

const Button = ({ text, link }) => (
  <Link to={link}>
    <button className="action-btn">
      <i className="fas fa-envelope"></i> {text}
    </button>
  </Link>
);

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [stats] = useState({
    totalStudents: 2,
    // activeCourses: 45,
    // upcomingEvents: 3,
    // newMessages: 2,
  });

  const [recentAnnouncements, setRecentAnnouncements] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (token) {
      // Fetch announcements
      axios
        .get("http://localhost:3000/api/notice/announcements", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setRecentAnnouncements(res.data))
        .catch((err) => console.error("Error fetching announcements:", err));

      // Fetch events
      // 
    }
  }, []);

  if (!isAuthenticated) return <Unauthorize />;

  return (
    <div className="home-container">
      {/* Glassmorphic Header */}
      <header className="glass-navbar">
        <div className="navbar-top">
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
          <h1 className="navbar-title">Student Dashboard</h1>
          <div className="navbar-right">
            <div className="notification-btn">
              <i className="fas fa-bell"></i>
              {stats.newMessages > 0 && (
                <span className="notification-count">{stats.newMessages}</span>
              )}
            </div>
            <div className="user-info">
              <img
                src={`https://ui-avatars.com/api/?name=Bibek+Parajuli&background=0D8ABC&color=fff`}
                alt="User"
                className="avatar"
              />
              <span>Bibek</span>
            </div>
          </div>
        </div>

        <nav className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link active">
            <i className="fas fa-home"></i> Dashboard
          </Link>
          <Link to="/students" className="nav-link">
            <i className="fas fa-users"></i> Students
          </Link>
          <Link to="/attendance" className="nav-link">
            <i className="fas fa-calendar-check"></i> Take Attendance
          </Link>
          <Link to="/contactus" className="nav-link">
            <i className="fas fa-envelope"></i> Contact Us
          </Link>
        </nav>
      </header>

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
                    <Link to={`/announcements/${a._id}`} className="read-more">
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
