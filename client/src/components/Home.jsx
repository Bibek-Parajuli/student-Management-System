import React from "react";
import "../styles/Utility.css";
import "../styles/Home.css";
import { Navbar } from "./Utility";

const Home = () => {



  
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <div id="home" className="hero-section">
        <div className="hero-content">
          <h1>Welcome to the Student Management System</h1>
          <p>
            A centralized platform for managing student data, performance, and
            achievements effortlessly.
          </p>
          <button>Get Started</button>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <img
              src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg"
              alt="Feature 1"
            />
            <h3>Student Profiles</h3>
            <p>Create, update, and manage student information easily.</p>
          </div>
          <div className="feature-card">
            <img
              src="https://shakirasinfo.data.blog/wp-content/uploads/2021/11/img_1661-980x653-1.jpg?w=980 "
              alt="Feature 2"
            />
            <h3>Attendance Tracking</h3>
            <p>Track and monitor student attendance in real time.</p>
          </div>
          <div className="feature-card">
            <img
              src="https://www.researchgate.net/publication/309558490/figure/fig2/AS:423246727258112@1477921291055/Propensity-score-plot-for-academic-track-and-comprehensive-school-students-in-logits.png"
              alt="Feature 3"
            />
            <h3>Performance Analysis</h3>
            <p>Analyze student grades and academic performance.</p>
          </div>
          <div className="feature-card">
            <img
              src="https://humanfocus.co.uk/wp-content/uploads/communication-in-the-classroom.jpg"
              alt="Feature 4"
            />
            <h3>Communication</h3>
            <p>Facilitate communication between teachers and students.</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer-section">
        <p>
          &copy; {new Date().getFullYear()} Student Management System. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
