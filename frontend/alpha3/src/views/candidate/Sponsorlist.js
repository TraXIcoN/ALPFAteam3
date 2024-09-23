import React from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaBuilding, FaUsers, FaHeart, FaGlobe, FaApple, FaCar } from 'react-icons/fa';

const SponsorList = () => {
  const sponsors = [
    {
      id: 1,
      name: 'Morgan Stanley',
      icon: <FaBuilding className="h-12 w-12 text-blue-500" />,
      industry: 'Finance',
      location: 'New York, NY, USA',
      roles: ['Financial Analyst', 'Investment Banking Intern'],
      website: 'https://www.morganstanley.com/careers',
    },
    {
      id: 2,
      name: 'ALPFA',
      icon: <FaUsers className="h-12 w-12 text-purple-500" />,
      industry: 'Non-Profit',
      location: 'Nationwide',
      roles: ['Community Engagement', 'Internship Program'],
      website: 'https://www.alpfa.org',
    },
    {
      id: 3,
      name: 'Community Restoration Project',
      icon: <FaHeart className="h-12 w-12 text-red-500" />,
      industry: 'Non-Profit',
      location: 'Various Locations',
      roles: ['Project Coordinator', 'Volunteer Manager'],
      website: 'https://www.communityrestorationproject.org',
    },
    {
      id: 4,
      name: 'Google',
      icon: <FaGlobe className="h-12 w-12 text-green-500" />,
      industry: 'Technology',
      location: 'Mountain View, CA, USA',
      roles: ['Software Engineer', 'Data Scientist'],
      website: 'https://careers.google.com',
    },
    {
      id: 5,
      name: 'Goldman Sachs',
      icon: <FaBuilding className="h-12 w-12 text-yellow-600" />,
      industry: 'Finance',
      location: 'New York, NY, USA',
      roles: ['Investment Analyst', 'Quantitative Analyst'],
      website: 'https://www.goldmansachs.com/careers',
    },
    {
      id: 6,
      name: 'Pfizer',
      icon: <FaHeart className="h-12 w-12 text-blue-300" />,
      industry: 'Healthcare',
      location: 'Remote',
      roles: ['Clinical Researcher', 'Pharmaceutical Engineer'],
      website: 'https://careers.pfizer.com',
    },
    {
      id: 7,
      name: 'Amazon',
      icon: <FaGlobe className="h-12 w-12 text-orange-600" />,
      industry: 'E-commerce',
      location: 'Seattle, WA, USA',
      roles: ['Software Developer', 'Operations Manager'],
      website: 'https://www.amazon.jobs',
    },
    {
      id: 8,
      name: 'Microsoft',
      icon: <FaBuilding className="h-12 w-12 text-blue-800" />,
      industry: 'Technology',
      location: 'Redmond, WA, USA',
      roles: ['Cloud Engineer', 'UX Designer'],
      website: 'https://careers.microsoft.com',
    },
    {
      id: 9,
      name: 'Apple',
      icon: <FaApple className="h-12 w-12 text-gray-800" />,
      industry: 'Technology',
      location: 'Cupertino, CA, USA',
      roles: ['Product Manager', 'Software Engineer'],
      website: 'https://www.apple.com/careers',
    },
    {
      id: 10,
      name: 'Tesla',
      icon: <FaCar className="h-12 w-12 text-red-500" />,
      industry: 'Automotive',
      location: 'Palo Alto, CA, USA',
      roles: ['Electrical Engineer', 'Data Analyst'],
      website: 'https://www.tesla.com/careers',
    },
    {
      id: 11,
      name: 'IBM',
      icon: <FaBuilding className="h-12 w-12 text-blue-500" />,
      industry: 'Technology',
      location: 'Armonk, NY, USA',
      roles: ['AI Researcher', 'Cloud Consultant'],
      website: 'https://www.ibm.com/employment',
    },
    {
      id: 12,
      name: 'Deloitte',
      icon: <FaBriefcase className="h-12 w-12 text-gray-700" />,
      industry: 'Consulting',
      location: 'New York, NY, USA',
      roles: ['Consultant', 'Audit Associate'],
      website: 'https://www2.deloitte.com/us/en/careers',
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Sponsor List</h1>
      <div className="space-y-6">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="flex items-center space-x-4">
              {/* Sponsor Icon */}
              <div className="flex-shrink-0">{sponsor.icon}</div>
              <div className="flex-1">
                {/* Company Name */}
                <h2 className="font-bold text-xl">{sponsor.name}</h2>
                {/* Industry and Location */}
                <p className="text-gray-600">
                  <FaBriefcase className="inline mr-2 text-blue-500" />
                  {sponsor.industry}
                </p>
                <p className="text-gray-600">
                  <FaMapMarkerAlt className="inline mr-2 text-blue-500" />
                  {sponsor.location}
                </p>
              </div>
            </div>

            {/* Available Roles */}
            <div className="mt-4">
              <p className="font-semibold">Available Roles:</p>
              <ul className="list-disc list-inside">
                {sponsor.roles.map((role, index) => (
                  <li key={index} className="text-gray-700">{role}</li>
                ))}
              </ul>
            </div>

            {/* Call to Action */}
            <div className="mt-4 flex space-x-2">
              <a href={sponsor.website} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                View Jobs
              </a>
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorList;
