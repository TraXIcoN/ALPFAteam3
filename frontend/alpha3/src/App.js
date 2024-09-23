// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import LandingPage from "./views/landingpage/landingPage"; // Corrected casing in import path
import Login from "./views/login/Login";
import SpoSignup from "./views/signup/SpoSignup";
import CanSignup from "./views/signup/CanSignup";
import Profile from "./views/candidate/profile/Profile";
import Typeformembed from "./views/candidate/profile/Typeformembed";
import Eventlist from "./views/candidate/Eventlist";
import Candidatedashboard from "./views/candidate/Candidatedashboard";
import Corspage from "./views/signup/Corspage";
import SponsorTypeformembed from "./views/candidate/profile/SponsorTypeformembed";
import ViewProfile from "./views/candidate/profile/Viewprofile";
import { View } from "lucide-react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Corspage" element={<Corspage />} />
        <Route path="/Candidatedashboard" element={<Candidatedashboard />} />
        <Route path="/Eventlist" element={<Eventlist />} />
        <Route path="/Typeformembed" element={<Typeformembed />} />
        <Route
          path="/SponsorTypeformembed"
          element={<SponsorTypeformembed />}
        />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/candidate-signup" element={<CanSignup />} />
        <Route path="/sponsor-signup" element={<SpoSignup />} />
        <Route path="/ViewProfile" element={<ViewProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
