import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../login/Login";
import Signup from "../signup/SpoSignup";
import NavBar from "../../components/navbar/NavBar"; // Import your existing NavBar component
import "./landingpage.css"; // Import CSS for App styling
import heroImage from "../../assets/hero-image.png"; // Replace with your hero image
// import logo from './assets/logo.png'; // Replace with your logo image

function LandingPage() {
  return (
    <div className="App">
      <NavBar /> {/* Keep the NavBar as is */}
      {/* Hero Section */}
      <section className="hero-section">
        <img src={heroImage} alt="Hero Background" className="hero-image" />
        <div className="hero-content">
          {/* <h1>divERGe</h1> */}
          {/* <p>ERG TRAINING PROGRAM</p> */}
        </div>
        {/* <img src={logo} alt="ALPFA Logo" className="hero-logo" /> */}
      </section>
      {/* Purpose Section */}
      <section className="purpose-section">
        <h2>ALPFA'S PURPOSE</h2>
        <p>Connecting Latino Leaders for Impact</p>
      </section>
      {/* Card Section (Find Chapter, Membership, Events, Partners) */}
      <section className="highlights-section">
        <div className="highlight-card">
          <h3>Find Your Chapter</h3>
          <p>
            ALPFA chapters offer professional development and career-building
            opportunities. Find the chapter closest to you and stay connected!
          </p>
        </div>
        <div className="highlight-card">
          <h3>Membership</h3>
          <p>
            Get access to best practice guides and opportunities to leaders at
            all levels of their careers from college to senior professionals.
          </p>
        </div>
        <div className="highlight-card">
          <h3>Events</h3>
          <p>
            ALPFA gives you a front row seat to some of the biggest events in
            the Latino community. Don’t miss our Annual Convention!
          </p>
        </div>
        <div className="highlight-card">
          <h3>Partners</h3>
          <p>
            Interested in becoming a partner? Learn more about how you can get
            involved and support ALPFA's mission.
          </p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
