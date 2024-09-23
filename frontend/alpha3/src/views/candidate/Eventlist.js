import React from 'react';
import { FaCalendarAlt, FaShareAlt, FaClipboardCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Eventlist = () => {

    const events = [
      {
        id: 1,
        title: 'Tech Careers Fair',
        date: '2024-10-10T10:00:00',
        time: '10:00 AM - 4:00 PM',
        location: 'Virtual',
        description: 'Join us for a day of networking with top tech companies.',
        company: 'Tech Corp',
      },
      {
        id: 2,
        title: 'Resume Building Workshop',
        date: '2024-10-15T14:00:00',
        time: '2:00 PM - 4:00 PM',
        location: 'Room 101, Main Building',
        description: 'Learn how to craft an impactful resume.',
        company: 'Career Center',
      },
      {
        id: 3,
        title: 'Career Development Seminar',
        date: '2024-10-25T11:00:00',
        time: '11:00 AM - 1:00 PM',
        location: 'Online',
        description: 'Explore career paths and development strategies.',
        company: 'Growth Hub',
      },
      {
        id: 4,
        title: 'Job Interview Preparation',
        date: '2024-10-30T15:00:00',
        time: '3:00 PM - 5:00 PM',
        location: 'Room 202, Main Building',
        description: 'Get ready for your next big interview.',
        company: 'Career Center',
      },
      {
        id: 5,
        title: 'Industry Networking Event',
        date: '2024-11-02T17:00:00',
        time: '5:00 PM - 8:00 PM',
        location: 'City Hall',
        description: 'Network with industry leaders and recruiters.',
        company: 'Networking Group',
      },
      {
        id: 6,
        title: 'Workshop on LinkedIn',
        date: '2024-11-05T13:00:00',
        time: '1:00 PM - 3:00 PM',
        location: 'Online',
        description: 'Optimize your LinkedIn profile for job hunting.',
        company: 'Social Media Experts',
      },
      {
        id: 7,
        title: 'Tech Innovation Expo',
        date: '2024-11-10T10:00:00',
        time: '10:00 AM - 4:00 PM',
        location: 'Convention Center',
        description: 'Showcase of the latest in tech innovations.',
        company: 'Tech Industry',
      },
      {
        id: 8,
        title: 'Entrepreneurship Panel',
        date: '2024-11-15T18:00:00',
        time: '6:00 PM - 9:00 PM',
        location: 'Community Center',
        description: 'Learn from successful entrepreneurs.',
        company: 'Business Network',
      },
      {
        id: 9,
        title: 'Diversity in the Workplace',
        date: '2024-11-20T14:00:00',
        time: '2:00 PM - 4:00 PM',
        location: 'Main Auditorium',
        description: 'Discuss the importance of diversity in the workplace.',
        company: 'Inclusion Org',
      },
    ];
  

  const handleRSVP = (event) => {
    alert(`You have RSVP'd for: ${event.title}`);
  };

  const handleShare = (event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Error sharing', error));
    } else {
      alert('Sharing not supported on this browser.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="font-bold text-xl">{event.title}</h2>
            <p>
              <FaCalendarAlt className="inline mr-2" />
              {new Date(event.date).toLocaleDateString()} | {event.time}
            </p>
            <p>Location: {event.location}</p>
            <Link to={`/event/${event.id}`} className="text-blue-500 hover:underline">
              View Description
            </Link>
            <p>{event.description}</p>
            <p>Organized by: {event.company}</p>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleRSVP(event)}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 text-lg"
              >
                RSVP
                <FaClipboardCheck className="inline ml-1" />
              </button>
              <button
                onClick={() => handleShare(event)}
                className="bg-gray-300 text-gray-800 rounded-lg px-4 py-2 text-lg"
              >
                Share
                <FaShareAlt className="inline ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventlist;