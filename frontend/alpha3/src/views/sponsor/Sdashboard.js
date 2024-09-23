import React from 'react';


const Landingpage= () => {
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 text-white flex justify-between">
        <div className="font-bold text-2xl">ALPFA Atlanta</div>
        <div>
          <a href="#about" className="px-4">About Us</a>
          <a href="#login" className="px-4">Login</a>
          <a href="#signup" className="px-4">Sign Up</a>
          <a href="#contact" className="px-4">Contact Us</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-blue-100 h-screen flex flex-col justify-center items-center text-center p-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Connecting Talent with Opportunity</h1>
        <p className="text-xl text-blue-700 mb-8">Simplifying job matches for professionals, students, and sponsors.</p>
        <div className="space-x-4">
          <a href="#members" className="bg-blue-600 text-white px-6 py-2 rounded">Find Your Match</a>
          <a href="#sponsors" className="bg-blue-600 text-white px-6 py-2 rounded">Find Qualified Candidates</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Why Choose Our Matching Platform?</h2>
        <p className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto">
          ALPFA Atlanta's platform bridges the gap between members (professionals and students) and corporate sponsors. 
          By focusing on skills, experience, and personal attributes, we provide tailored job opportunities that align with 
          members' profiles and sponsors' needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-blue-700 mb-2">Sponsor-Specific Events</h3>
            <p>Sponsors seek efficient matches and invite members who align well with job offers.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-blue-700 mb-2">Career Fair Style Events</h3>
            <p>Members receive insights into which sponsors are most likely to match their profiles.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-100 py-20 px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Tailored Recommendations</h3>
            <p>We match members with sponsors based on both professional and human attributes.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Event Matching</h3>
            <p>Members connect with sponsors through sponsor-specific or career fair events.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Ranked Matching</h3>
            <p>Members are ranked to know which sponsors are more likely to fit their profiles.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-white py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">What People Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <p className="text-gray-700 mb-4">“This platform helped me land my dream job with a top sponsor at a career fair!”</p>
            <p className="font-bold text-blue-700">– Member Name</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <p className="text-gray-700 mb-4">“We found highly qualified candidates faster than ever, thanks to the tailored recommendations.”</p>
            <p className="font-bold text-blue-700">– Sponsor Name</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-8 text-center">
        <p>&copy; 2024 ALPFA Atlanta. All rights reserved.</p>
        <div className="mt-4">
          <a href="#" className="px-4">About Us</a>
          <a href="#" className="px-4">Privacy Policy</a>
          <a href="#" className="px-4">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default Landingpage;
