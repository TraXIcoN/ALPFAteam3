// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import LandingPage from "./views/landingpage/landingPage";
import Login from "./views/login/Login";
import SpoSignup from "./views/signup/SpoSignup";
import CanSignup from "./views/signup/CanSignup";
import Profile from "./views/candidate/profile/Profile";
import Typeformembed from "./views/candidate/profile/Typeformembed";
import SponsorTypeformembed from "./views/sponsor/profile/sponsorTypeformembed";
import Eventlist from "./views/candidate/Eventlist";
import Candidatedashboard from "./views/candidate/Candidatedashboard";
import Sdashboard from "./views/sponsor/Sdashboard";
import Corspage from "./views/signup/Corspage";
import ViewProfile from "./views/candidate/profile/Viewprofile";
import ViewSponsorProfile from "./views/sponsor/profile/ViewSponsorProfile";
import SponsorProfile from "./views/sponsor/profile/SponsorProfile";
import { View } from "lucide-react";
import Candidatelist from "./views/sponsor/Candidatelist";
import Sponsorlist from "./views/candidate/Sponsorlist";
import EventDescription from "./views/candidate/EventDescription";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/event/:id" component={<EventDescription />} />
        <Route path="/Sponsorlist" element={<Sponsorlist />} />
        <Route path="/Candidatelist" element={<Candidatelist />} />
        <Route path="/Sdashboard" element={<Sdashboard />} />
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
        <Route path="/ViewSponsorProfile" element={<ViewSponsorProfile />} />
        <Route path="/sponsor-profile" element={<SponsorProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
