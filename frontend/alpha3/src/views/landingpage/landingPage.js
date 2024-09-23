import React from "react";
import {
  ArrowRightIcon,
  UserIcon,
  BriefcaseIcon,
  LightbulbIcon,
} from "lucide-react";
import alpfalogo from "../../assets/alpfalogo.png";

const Landingpage = () => {
  return (
    <div className="min-h-screen">
      {/* Top section with gradient background */}
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
        {/* Background Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-white opacity-10 rounded-full"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white opacity-10 rounded-full"></div>
        </div>

        {/* Content for top section */}
        <div className="relative z-10">
          {/* Header */}
          <header className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
              <div className="flex items-center">
                <img src={alpfalogo} alt="Latino Link Logo" className="h-16 w-16 mr-2" />
                <h1 className="text-3xl font-bold text-white">Latino Link</h1>
              </div>
              <nav>
                <ul className="flex space-x-4">
                  <li><a href="#about" className="text-white hover:text-blue-200">About Us</a></li>
                  <li><a href="/Login" className="text-white hover:text-blue-200">Login</a></li>
                  <li><a href="/admin" className="text-white hover:text-blue-200">Admin Login</a></li>
                  <li><a href="/Signup" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">Sign Up</a></li>
                </ul>
              </nav>
            </div>
          </header>

          {/* Hero Section */}
          <section className="py-20 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-4">Revolutionizing Job Matching for Latino Link Members</h2>
              <p className="text-xl mb-8">Connecting qualified candidates with the right opportunities efficiently and effectively.</p>
              <a href="#learn-more" className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-100 inline-flex items-center">
                Learn More <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Rest of the page content (unchanged) */}
      <div className="bg-gray-100">
        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Our Solution</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<UserIcon className="h-12 w-12 text-blue-600" />}
                title="Tailored Recommendations"
                description="Provide personalized job matches for members and candidate suggestions for sponsors."
              />
              <FeatureCard 
                icon={<BriefcaseIcon className="h-12 w-12 text-blue-600" />}
                title="Event-Specific Matching"
                description="Optimize matching for both sponsor-specific events and career fairs."
              />
              <FeatureCard 
                icon={<LightbulbIcon className="h-12 w-12 text-blue-600" />}
                title="Holistic Profiling"
                description="Consider both professional skills and human aspects for comprehensive matching."
              />
            </div>
          </div>
        </section>

        {/* Event Types Section */}
        <section className="bg-gray-200 py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Event Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <EventTypeCard 
                title="Sponsor Specific Events"
                sponsorNeed="Needs matching profiles"
                memberBenefit="Invited if adequately matching the offer"
              />
              <EventTypeCard 
                title="Career Fair Style Events"
                sponsorNeed="Prefer matching profiles"
                memberBenefit="Ranked list of likely interested sponsors"
              />
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="bg-gray-100 py-12 px-6 md:px-12 lg:px-24 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">About Latino Link</h2>
          <p className="text-lg text-gray-700 mb-6">
            At Latino Link, we are committed to bridging the gap between talented professionals and corporate sponsors. 
            Our goal is to create meaningful connections that help both our members and sponsors thrive. 
            Through our tailored approach, we ensure that our members find the best career opportunities 
            and that sponsors connect with qualified, passionate individuals.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            We understand that job matching is more than just aligning skills and experience — it's about human connection, shared goals, 
            and mutual growth. Whether you're a sponsor looking for the right candidates or a professional seeking the right role, 
            we're here to make that process seamless and rewarding.
          </p>
          <p className="text-lg text-gray-700">
            With our innovative platform, we enhance your experience by providing personalized recommendations 
            and guiding you to the opportunities that truly matter. Join us and be part of a community that values both professional and personal growth.
          </p>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Enhance Your Job Matching Experience?</h3>
            <p className="text-xl mb-8">Join Latino Link today and connect with the right opportunities!</p>
            <a href="/signup" className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-100">
              Sign Up Now
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 Latino Link. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h4 className="text-xl font-bold mb-2">{title}</h4>
    <p>{description}</p>
  </div>
);

const EventTypeCard = ({ title, sponsorNeed, memberBenefit }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h4 className="text-xl font-bold mb-4">{title}</h4>
    <p className="mb-2">
      <strong>Sponsors:</strong> {sponsorNeed}
    </p>
    <p>
      <strong>Members:</strong> {memberBenefit}
    </p>
  </div>
);

export default Landingpage;