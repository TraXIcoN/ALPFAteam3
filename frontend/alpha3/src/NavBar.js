// src/NavBar.js
import React from 'react';
import './NavBar.css'; // Import your custom CSS for styling

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="Alpfa_logo.png" alt="Alpfa" className="logo" />
      </div>
      <ul className="navbar-links">
        <li className="dropdown">
          ABOUT US
          <div className="dropdown-content">
            <button>Our Story</button>
            <button>Our Team</button>
          </div>
        </li>
        <li className="dropdown">
          JOB BOARD
          <div className="dropdown-content">
            <button>Available Jobs</button>
            <button>Post a Job</button>
          </div>
        </li>
        <li className="dropdown">
          PROGRAMS
          <div className="dropdown-content">
            <button>Current Programs</button>
            <button>Apply</button>
          </div>
        </li>
        <li className="dropdown">
          EVENTS
          <div className="dropdown-content">
            <button>Upcoming Events</button>
            <button>Past Events</button>
          </div>
        </li>
        <li className="dropdown">
          RESOURCES
          <div className="dropdown-content">
            <button>Guides</button>
            <button>FAQs</button>
          </div>
        </li>
        <li className="dropdown">
          PARTNERS
          <div className="dropdown-content">
            <button>Our Partners</button>
            <button>Partner With Us</button>
          </div>
        </li>
      </ul>
      <div className="navbar-buttons">
        <button className="login-btn">MEMBER LOGIN</button>
        <button className="register-btn">REGISTER</button>
        <a href="/faqs" className="faq-link">FAQs</a> {/* Change to an anchor tag for navigation */}
      </div>
    </nav>
  );
}

export default NavBar;
