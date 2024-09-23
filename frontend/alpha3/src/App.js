// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import LandingPage from "./views/landingpage/landingPage"; // Corrected casing in import path
import Login from "./views/login/Login";
import Signup from "./views/signup/Signup";
import Profile from "./views/candidate/profile/Profile";
import Typeformembed from "./views/candidate/profile/Typeformembed";
import Eventlist from "./views/candidate/Eventlist";
import Candidatedashboard from "./views/candidate/Candidatedashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Candidatedashboard" element={<Candidatedashboard />} />
        <Route path="/Eventlist" element={<Eventlist />} />
        <Route path="/Typeformembed" element={<Typeformembed />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
