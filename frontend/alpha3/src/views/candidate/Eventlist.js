import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaShareAlt, FaClipboardCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for making API calls
import Cookies from "js-cookie";

const Eventlist = () => {
  const [events, setEvents] = useState([]); // State to hold events data
  const [myEvents, setMyEvents] = useState([]); // State to hold user's events
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error
  const [activeTab, setActiveTab] = useState("upcoming"); // State to manage active tab
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve the token from local storage
        const csrfToken = Cookies.get("csrftoken");
        const response = await axios.get("http://localhost:8000/api/events/", {
          headers: {
            Authorization: `Token ${token}`, // Include the token in the headers
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
        }); // Replace with your API endpoint

        const allEvents = response.data;
        console.log(response.data);

        const candidateId = await getCandidateId(userId);

        // Filter events to find those RSVPed by the logged-in user
        const filteredEvents = allEvents.filter(
          (event) => event.candidates_rsvped.includes(candidateId) // Check if userId is in candidates_rsvped
        );

        setEvents(allEvents); // Set the events data from the response
        setMyEvents(filteredEvents); // Set the events data from the response
      } catch (err) {
        setError("Error fetching events"); // Set error message if API call fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchEvents(); // Call the fetch function
  }, []); // Empty dependency array to run once on component mount

  const handleRSVP = async (event) => {
    if (event.candidates_rsvped.includes(userId)) {
      alert(`You have already RSVP'd for: ${event.title}`);
      return; // Exit if the user has already RSVP'd
    }

    // Retrieve the candidate ID based on the logged-in user
    const candidateId = await getCandidateId(userId); // Implement this function to get the candidate ID
    console.log(candidateId);
    // Add the candidate ID to the candidates_rsvped list
    const updatedEvent = {
      ...event,
      candidates_rsvped: [...event.candidates_rsvped, candidateId], // Add the candidate ID
    };

    // Use PUT request to update the event in the backend
    try {
      const token = localStorage.getItem("authToken"); // Retrieve the token from local storage
      const csrfToken = Cookies.get("csrftoken");
      await axios.put(
        `http://localhost:8000/api/events/${event.id}/`,
        updatedEvent,
        {
          headers: {
            Authorization: `Token ${token}`, // Include the token in the headers
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
        }
      );

      // Update the state to reflect the RSVP
      setEvents((prevEvents) =>
        prevEvents.map((e) => (e.id === event.id ? updatedEvent : e))
      );
      setMyEvents((prevMyEvents) =>
        prevMyEvents.map((e) => (e.id === event.id ? updatedEvent : e))
      );

      alert(`You have RSVP'd for: ${event.title}`);
    } catch (error) {
      console.error("Error RSVPing for event:", error);
      alert("There was an error RSVPing for the event.");
    }
  };

  const handleShare = (event) => {
    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  if (loading) return <div>Loading events...</div>; // Show loading message
  if (error) return <div>{error}</div>; // Show error message

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Events</h1>
      <div className="mb-4">
        <button
          onClick={() => toggleTab("upcoming")}
          className={`px-4 py-2 mr-2 rounded ${
            activeTab === "upcoming" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Upcoming Events
        </button>
        <button
          onClick={() => toggleTab("my")}
          className={`px-4 py-2 rounded ${
            activeTab === "my" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          My Events
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeTab === "upcoming" ? events : myEvents).map((event) => (
          <div
            key={event.id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col h-full"
          >
            <h2 className="font-bold text-xl">{event.title}</h2>
            <p>
              <FaCalendarAlt className="inline mr-2" />
              {new Date(event.date).toLocaleDateString()} | {event.time}
            </p>
            <p>Location: {event.location}</p>
            <Link
              to={`/event/${event.id}`}
              className="text-blue-500 hover:underline"
            >
              View Description
            </Link>
            <p>{event.description}</p>
            <p>Organized by: {event.company}</p>

            <div className="mt-auto flex justify-center space-x-2">
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

// Function to get the candidate ID based on the user ID
const getCandidateId = async (userId) => {
  try {
    const token = localStorage.getItem("authToken");
    const csrfToken = Cookies.get("csrftoken");
    const response = await axios.get(
      `http://localhost:8000/candidate/profile/id/?user=${userId}`,
      {
        headers: {
          Authorization: `Token ${token}`,
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.id; // Assuming the response returns an array of candidates
  } catch (error) {
    console.error("Error fetching candidate ID:", error);
    return null; // Handle error appropriately
  }
};

export default Eventlist;
