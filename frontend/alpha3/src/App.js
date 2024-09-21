<<<<<<< HEAD
// // src/App.js
// import React from 'react';
// import NavBar from './NavBar';  // Import your super cool custom NavBar

// function App() {
//   return (
//     <div className="App">
//       <NavBar />  {/* Your fab NavBar, styled and ready to go */}
//       <main>
//         <h1>Hey there, welcome to ALPFA!</h1>
//         <p>If you're all about making connections and growing professionally, you're in the right spot. Dive into our sections, find your tribe, and let's kick some professional goals together!</p>
//         {/* Feel free to add more components or content here. The world is your oyster! 🌎 */}
//       </main>
//     </div>
//   );
// }

// export default App;


// src/App.js
import React from 'react';
import NavBar from './NavBar'; // Import your existing NavBar component
import './App.css'; // Import CSS for App styling
import heroImage from './assets/hero-image.png'; // Replace with your hero image
// import logo from './assets/logo.png'; // Replace with your logo image

function App() {
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
          <p>ALPFA chapters offer professional development and career-building opportunities. Find the chapter closest to you and stay connected!</p>
        </div>
        <div className="highlight-card">
          <h3>Membership</h3>
          <p>Get access to best practice guides and opportunities to leaders at all levels of their careers from college to senior professionals.</p>
        </div>
        <div className="highlight-card">
          <h3>Events</h3>
          <p>ALPFA gives you a front row seat to some of the biggest events in the Latino community. Don’t miss our Annual Convention!</p>
        </div>
        <div className="highlight-card">
          <h3>Partners</h3>
          <p>Interested in becoming a partner? Learn more about how you can get involved and support ALPFA's mission.</p>
        </div>
      </section>
    </div>
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
>>>>>>> 3f94c861b8efe3fe61f6142ed3441dc7e01b491e
  );
}

export default App;
