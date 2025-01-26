import React from 'react';
import '../styles/Utility.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>StudentMS</h1>
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

