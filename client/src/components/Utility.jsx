import  { useState } from 'react';
// import '../styles/Home.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  // Sample data - replace with real data from your API
  const [stats] = useState({
    totalStudents: 1245,
    activeCourses: 45,
    upcomingEvents: 3,
    newMessages: 2
  });



  return (
     <div className='home-container'>
      {/* Header */}
      <header className="home-header">
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
                <span className="notification-badge">{stats.newMessages}</span>
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
        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/dashboard" className="nav-link active">
            <i className="fas fa-home"></i> Dashboard
          </Link>
          <Link to="/students" className="nav-link">
            <i className="fas fa-users"></i> Students
          </Link>
          
          <Link to="/attendance" className="nav-link">
            <i className="fas fa-chart-bar"></i> Take Attadance
          </Link>
         
        </nav>
      </header>
      </div>)}

      export default Navbar