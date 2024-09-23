import React from 'react';
import { useParams } from 'react-router-dom';

const EventDescription = () => {
  const { id } = useParams();

  // Detailed event information based on ID
  const eventDetails = {
    1: {
      title: 'Tech Careers Fair',
      description: 'Join us for a day of networking with top tech companies.',
      sponsors: [
        { name: 'Tech Corp', industry: 'Technology', size: 'Large', contact: 'John Doe' },
        { name: 'Innovate Inc.', industry: 'Software', size: 'Medium', contact: 'Jane Smith' },
      ],
      additionalDetails: {
        date: '2024-10-10',
        time: '10:00 AM - 4:00 PM',
        location: 'Virtual',
        topics: ['Networking', 'Job Opportunities', 'Tech Innovations'],
      },
    },
    2: {
      title: 'Resume Building Workshop',
      description: 'Learn how to craft an impactful resume.',
      sponsors: [
        { name: 'Career Center', industry: 'Education', size: 'Large', contact: 'Emily Johnson' },
      ],
      additionalDetails: {
        date: '2024-10-15',
        time: '2:00 PM - 4:00 PM',
        location: 'Room 101, Main Building',
        topics: ['Resume Writing', 'Interview Tips'],
      },
    },
    3: {
      title: 'Career Development Seminar',
      description: 'Explore career paths and development strategies.',
      sponsors: [
        { name: 'Growth Hub', industry: 'Consulting', size: 'Medium', contact: 'Sarah Wilson' },
      ],
      additionalDetails: {
        date: '2024-10-25',
        time: '11:00 AM - 1:00 PM',
        location: 'Online',
        topics: ['Career Paths', 'Skill Development'],
      },
    },
    4: {
      title: 'Job Interview Preparation',
      description: 'Get ready for your next big interview.',
      sponsors: [
        { name: 'Career Center', industry: 'Education', size: 'Large', contact: 'Kevin White' },
      ],
      additionalDetails: {
        date: '2024-10-30',
        time: '3:00 PM - 5:00 PM',
        location: 'Room 202, Main Building',
        topics: ['Interview Techniques', 'Mock Interviews'],
      },
    },
    5: {
      title: 'Industry Networking Event',
      description: 'Network with industry leaders and recruiters.',
      sponsors: [
        { name: 'Networking Group', industry: 'Various', size: 'Large', contact: 'Maria Garcia' },
      ],
      additionalDetails: {
        date: '2024-11-02',
        time: '5:00 PM - 8:00 PM',
        location: 'City Hall',
        topics: ['Networking', 'Job Opportunities'],
      },
    },
    6: {
      title: 'Workshop on LinkedIn',
      description: 'Optimize your LinkedIn profile for job hunting.',
      sponsors: [
        { name: 'Social Media Experts', industry: 'Social Media', size: 'Medium', contact: 'Tom Johnson' },
      ],
      additionalDetails: {
        date: '2024-11-05',
        time: '1:00 PM - 3:00 PM',
        location: 'Online',
        topics: ['LinkedIn Optimization', 'Networking'],
      },
    },
    7: {
      title: 'Tech Innovation Expo',
      description: 'Showcase of the latest in tech innovations.',
      sponsors: [
        { name: 'Tech Industry', industry: 'Technology', size: 'Large', contact: 'Alice Brown' },
      ],
      additionalDetails: {
        date: '2024-11-10',
        time: '10:00 AM - 4:00 PM',
        location: 'Convention Center',
        topics: ['Technology', 'Innovation'],
      },
    },
    8: {
      title: 'Entrepreneurship Panel',
      description: 'Learn from successful entrepreneurs.',
      sponsors: [
        { name: 'Business Network', industry: 'Entrepreneurship', size: 'Small', contact: 'John Smith' },
      ],
      additionalDetails: {
        date: '2024-11-15',
        time: '6:00 PM - 9:00 PM',
        location: 'Community Center',
        topics: ['Entrepreneurship', 'Business Growth'],
      },
    },
    9: {
      title: 'Diversity in the Workplace',
      description: 'Discuss the importance of diversity in the workplace.',
      sponsors: [
        { name: 'Inclusion Org', industry: 'Non-Profit', size: 'Medium', contact: 'Sarah Johnson' },
      ],
      additionalDetails: {
        date: '2024-11-20',
        time: '2:00 PM - 4:00 PM',
        location: 'Main Auditorium',
        topics: ['Diversity', 'Inclusion'],
      },
    },
  };

  const event = eventDetails[id];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {event ? (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <p>{event.description}</p>
          <h2 className="mt-4 font-semibold">Event Details:</h2>
          <p>Date: {event.additionalDetails.date}</p>
          <p>Time: {event.additionalDetails.time}</p>
          <p>Location: {event.additionalDetails.location}</p>
          <p>Topics Covered: {event.additionalDetails.topics.join(', ')}</p>
          
          <h2 className="mt-4 font-semibold">Sponsors:</h2>
          <ul>
            {event.sponsors.map((sponsor, index) => (
              <li key={index}>
                {sponsor.name} - {sponsor.industry} (Size: {sponsor.size}, Contact: {sponsor.contact})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Event not found.</p>
      )}
    </div>
  );
};

export default EventDescription;
