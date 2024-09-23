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
import Eventlist from "./views/candidate/Eventlist";
import Candidatedashboard from "./views/candidate/Candidatedashboard";
import Corspage from './views/signup/Corspage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Corspage" element={<Corspage/>} />
        <Route path="/Candidatedashboard" element={<Candidatedashboard/>} />
        <Route path="/Eventlist" element={<Eventlist/>} />
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
