// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import LandingPage from "./views/landingpage/landingPage"; // Corrected casing in import path
import Login from "./views/login/Login";
import Signup from "./views/signup/Signup";
import SponsorProfile from './views/sponsor/profile/SponsorProfile';
import Profile from "./views/candidate/profile/Profile";
import Typeformembed from "./views/candidate/profile/Typeformembed";
import SponsorTypeformembed from "./views/sponsor/profile/sponsorTypeformembed";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Typeformembed" element={<Typeformembed/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sponsor-profile" element={<SponsorProfile />} />
        <Route path="/sponsorTypeformembed" element={<SponsorTypeformembed/>} />
      </Routes>
    </Router>
  );
}

export default App;
