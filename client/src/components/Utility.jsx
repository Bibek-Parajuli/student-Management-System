import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Home.css';

const Navbar = ({ title = "Student Dashboard", user = "Bibek", notifications = 1 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const location = useLocation();

  const links = [
    { path: "/dashboard", icon: "fa-home", label: "Dashboard" },
    { path: "/students", icon: "fa-users", label: "Students" },
    { path: "/attendance", icon: "fa-chart-bar", label: "Take Attendance" },
  ];

  return (
    <header id='blue' className="home-header-fix">
      <div  className="header-content">
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <i className="fas fa-bars"></i>
        </button>
        <h1>{title}</h1>
        <div className="header-actions">
          <button className="notification-btn">
            <i className="fas fa-bell"></i>
            {notifications > 0 && (
              <span className="notification-badge">{notifications}</span>
            )}
          </button>
          <div className="user-profile">
            <img
              src={user.profilePic || "https://via.placeholder.com/40"}
              alt="User profile"
              className="profile-pic"
            />
            <span>{user || "Guest"}</span>
          </div>
        </div>
      </div>

      <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            <i className={`fas ${link.icon}`}></i> {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};
 
 export const Unauthorize = () => {
   return (
     <div>Unauthorize</div>
   )
 }
 
export default Navbar;