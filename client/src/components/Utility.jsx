import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.module.css";

const Navbar = ({
  title = "Student Dashboard",
  user = { name: "Bibek", profilePic: "" },
  notifications = 1,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { path: "/dashboard", icon: "fa-home", label: "Dashboard" },
    { path: "/students", icon: "fa-users", label: "Students" },
    { path: "/attendance", icon: "fa-calendar-check", label: "Attendance" },
  ];

  // 🔓 LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // redirect to login page
    navigate("/login");
  };

  return (
    <header className="glass-navbar">
      <div className="navbar-top">
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>

        <h1 className="navbar-title">{title}</h1>

        <div className="navbar-right">
          <div
            className="notification-btn"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
            title="Logout"
          >Logout
            
          </div>

          <div className="user-info">
            <img
              src={
                user.profilePic ||
                `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`
              }
              alt="User"
              className="avatar"
            />
            <span>{user.name || "Guest"}</span>
          </div>
        </div>
      </div>

      <nav className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link ${
              location.pathname === link.path ? "active" : ""
            }`}
          >
            <i className={`fas ${link.icon}`}></i> {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

// ❌ Unauthorized page (simple placeholder)
export const Unauthorize = () => {
  return <div>Unauthorized</div>;
};

export default Navbar;
