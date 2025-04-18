import { useEffect, useState } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { Unauthorize } from "./Utility";

const Button = ({ text, link }) => {
  return (
    <Link to={link}>
      <button className="action-btn">
        <i className="fas fa-envelope"></i> {text}
      </button>
    </Link>
  );
};

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
  
  // Sample data - replace with real data from your API
  const [stats] = useState({
    totalStudents: 1245,
    activeCourses: 45,
    upcomingEvents: 3,
    newMessages: 2,
  });

  const [recentAnnouncements] = useState([
    {
      id: 1,
      title: "Midterm Schedule Released",
      body: "This is dherai data",
      date: "2024-03-15",
    },
    {
      id: 2,
      title: "New Library Hours",
      body: "This is dherai data",
      date: "2024-03-14",
    },
    {
      id: 3,
      title: "Career Fair Registration Open",
      body: "This is dherai data",
      date: "2024-03-13",
    },
  ]);

  const [upcomingEvents] = useState([
    {
      id: 1,
      title: "Faculty Meeting",
      date: "March 20, 2024",
      time: "2:00 PM",
    },
    {
      id: 2,
      title: "Student Orientation",
      date: "March 25, 2024",
      time: "9:00 AM",
    },
  ]);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, []); // Run this only once when the component mounts

  // If not authenticated, show the Unauthorize component
  if (!isAuthenticated) {
    return <Unauthorize />;
  }

  // If authenticated, render the rest of the page
  return (
    <div className="home-container">
      {/* Header */}
      <header id="blue" className="home-header-fix">
        <div className="header-content">
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <i className="fas fa-bars"></i>
          </button>
          <h1>Student Dashboard</h1>
          <div className="header-actions">
            <button className="notification-btn">
              <i className="fas fa-bell"></i>
              {stats.newMessages > 0 && (
                <span className="notification-badge">
                  {stats.newMessages}
                </span>
              )}
            </button>
            <div className="user-profile">
              <img
                src="https://via.placeholder.com/40"
                alt="User profile"
                className="profile-pic"
              />
              <span>John Doe</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`main-nav ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link active">
            <i className="fas fa-home"></i> Dashboard
          </Link>
          <Link to="/students" className="nav-link">
            <i className="fas fa-users"></i> Students
          </Link>

          <Link to="/attendance" className="nav-link">
            <i className="fas fa-chart-bar"></i> Take Attadance
          </Link>
          <Link to="/contactus" className="nav-link">
            <i className="fas fa-chart-bar"></i> Contact Us
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Quick Stats */}
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
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-book"></i>
            </div>

            <div className="stat-info">
              <h3>Upcoming Events</h3>
              <p>{stats.upcomingEvents}</p>
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="content-grid">
          {/* Recent Announcements */}
          <section className="announcements-section">
            <div className="section-header">
              <h2>Recent Announcements</h2>
              <Link to="/announcements" className="view-all">
                View All
              </Link>
            </div>
            <div className="announcements-list">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="announcement-card">
                  <div className="announcement-date">
                    {new Date(announcement.date).toLocaleDateString()}
                  </div>
                  <h4 className="announcement-title">{announcement.title}</h4>
                  <Link
                    to={`/announcements/${announcement.id}`}
                    className="read-more"
                  >
                    Read More <i className="fas fa-chevron-right"></i>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Events */}
          <section className="events-section">
            <div className="section-header">
              <h2>Upcoming Events</h2>
              <Link to="/calendar" className="view-all">
                View Calendar
              </Link>
            </div>
            <div className="events-list">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-date">
                    <div className="event-day">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="event-month">
                      {new Date(event.date).toLocaleString("default", {
                        month: "short",
                      })}
                    </div>
                  </div>
                  <div className="event-info">
                    <h4 className="event-title">{event.title}</h4>
                    <p className="event-time">{event.time}</p>
                  </div>
                  <button className="event-reminder">
                    <i className="fas fa-bell"></i> Set Reminder
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions Sidebar */}
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
