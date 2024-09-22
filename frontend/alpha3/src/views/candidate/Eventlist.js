import React, { useState } from 'react';
import { Search, ChevronDown, Menu } from 'lucide-react';

const Eventlist = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showMediumDropdown, setShowMediumDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showEmployerDropdown, setShowEmployerDropdown] = useState(false);
  const [showMoreFiltersDropdown, setShowMoreFiltersDropdown] = useState(false);

  const toggleCategoryDropdown = () => setShowCategoryDropdown(!showCategoryDropdown);
  const toggleMediumDropdown = () => setShowMediumDropdown(!showMediumDropdown);
  const toggleDateDropdown = () => setShowDateDropdown(!showDateDropdown);
  const toggleEmployerDropdown = () => setShowEmployerDropdown(!showEmployerDropdown);
  const toggleMoreFiltersDropdown = () => setShowMoreFiltersDropdown(!showMoreFiltersDropdown);

  const events = [
    {
      title: "Fall 2024 UCS Employer Meet & Greets",
      date: "In-person · Thu, Sep 5-Thu, Nov 7",
      type: "CAREER FAIR",
      attendees: 57,
      saved: false
    },
    {
      title: "JOIN Sophomore Career Community (ASPIRE) Fall...",
      date: "In-person · Mon, Aug 26-Fri, Nov 8",
      type: "GUIDANCE",
      attendees: 45,
      saved: true
    },
    {
      title: "Experience Pays: Learn and Earn Employer Panels",
      date: "In-person · Tue, Sep 10-Tue, Sep 24",
      type: "HIRING",
      attendees: 127,
      saved: false
    }
  ];

  const categories = [
    "Career fair",
    "Networking",
    "Hiring",
    "Employer info",
    "Guidance",
    "Academic",
    "Conference",
    "General"
  ];

  return (
    <div className="flex h-screen bg-gray-100">


      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Events</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Search and filters */}
          <div className="mb-6">
            <div className="relative">
              <input type="text" placeholder="Search events" className="w-full pl-10 pr-4 py-2 border rounded-md" />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>

            <div className="flex flex-wrap mt-4 space-x-2 space-y-2">
              {/* Category Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleCategoryDropdown}
                  className="px-3 py-1 border rounded-md flex items-center justify-between w-full sm:w-auto"
                >
                  Category <ChevronDown size={16} className="ml-1" />
                </button>
                {showCategoryDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center mb-2 p-2">
                        <input
                          type="checkbox"
                          id={`category-${index}`}
                          className="mr-2"
                          checked={selectedCategory.includes(category)}
                          onChange={() => {
                            setSelectedCategory((prev) =>
                              prev.includes(category)
                                ? prev.filter((c) => c !== category)
                                : [...prev, category]
                            );
                          }}
                        />
                        <label htmlFor={`category-${index}`} className="text-gray-700">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Medium Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleMediumDropdown}
                  className="px-3 py-1 border rounded-md flex items-center justify-between w-full sm:w-auto"
                >
                  Medium <ChevronDown size={16} className="ml-1" />
                </button>
                {showMediumDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                    <div className="flex items-center mb-2 p-2">
                      <input type="checkbox" id="in-person" className="mr-2" />
                      <label htmlFor="in-person" className="text-gray-700">In-person</label>
                    </div>
                    <div className="flex items-center p-2">
                      <input type="checkbox" id="online" className="mr-2" />
                      <label htmlFor="online" className="text-gray-700">Online</label>
                    </div>
                  </div>
                )}
              </div>

              {/* Date Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDateDropdown}
                  className="px-3 py-1 border rounded-md flex items-center justify-between w-full sm:w-auto"
                >
                  Date <ChevronDown size={16} className="ml-1" />
                </button>
                {showDateDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                    <div className="flex items-center mb-2 p-2">
                      <input type="radio" id="today" name="date" className="mr-2" />
                      <label htmlFor="today" className="text-gray-700">Today</label>
                    </div>
                    <div className="flex items-center mb-2 p-2">
                      <input type="radio" id="tomorrow" name="date" className="mr-2" />
                      <label htmlFor="tomorrow" className="text-gray-700">Tomorrow</label>
                    </div>
                    <div className="flex items-center p-2">
                      <input type="radio" id="this-week" name="date" className="mr-2" />
                      <label htmlFor="this-week" className="text-gray-700">This Week</label>
                    </div>
                  </div>
                )}
              </div>

              {/* Employer Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleEmployerDropdown}
                  className="px-3 py-1 border rounded-md flex items-center justify-between w-full sm:w-auto"
                >
                  Employer <ChevronDown size={16} className="ml-1" />
                </button>
                {showEmployerDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                    <input type="text" placeholder="Search employers" className="w-full pl-2 py-1 border rounded-md p-2" />
                  </div>
                )}
              </div>

              {/* More Filters Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleMoreFiltersDropdown}
                  className="px-3 py-1 border rounded-md flex items-center justify-between w-full sm:w-auto"
                >
                  More filters <ChevronDown size={16} className="ml-1" />
                </button>
                {showMoreFiltersDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                    <div className="flex items-center mb-2 p-2">
                      <input type="checkbox" id="paid" className="mr-2" />
                      <label htmlFor="paid" className="text-gray-700">Paid</label>
                    </div>
                    <div className="flex items-center p-2">
                      <input type="checkbox" id="internship" className="mr-2" />
                      <label htmlFor="internship" className="text-gray-700">Internship</label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Events */}
          <h2 className="text-2xl font-bold mb-4">All events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-sm">
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date}</p>
                <div className="mt-2">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{event.type}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">{event.attendees} students going</span>
                  <button className={`text-blue-600 ${event.saved ? 'font-bold' : ''}`}>
                    {event.saved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Eventlist;
