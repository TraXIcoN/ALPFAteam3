import React, { useState, useEffect } from "react";
import {
  FaUserTie,
  FaUserGraduate,
  FaUserCog,
  FaUserSecret,
  FaUserMd,
} from "react-icons/fa"; // Importing some icons
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios"; // Import Axios
import Cookies from "js-cookie"; // Import js-cookie

const CandidateList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [candidates, setCandidates] = useState([]); // Ensure it's initialized as an empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [sortOption, setSortOption] = useState("matchScore"); // Default sort option
  const [filterLocation, setFilterLocation] = useState(""); // Default filter location
  const [selectedCandidateId, setSelectedCandidateId] = useState(null); // State to store selected candidate ID

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const csrfToken = Cookies.get("csrftoken");

        // Fetch the sponsor's profile data
        const sponsorResponse = await axios.get(
          "http://localhost:8000/sponsor/profile/",
          {
            headers: {
              Authorization: `Token ${token}`,
              "X-CSRFToken": csrfToken,
              "Content-Type": "application/json",
            },
          }
        );

        const sponsorData = sponsorResponse.data; // Assuming the response contains the sponsor's data

        // Prepare the request body with sponsor data
        const requestBody = {
          open_roles: sponsorData.open_roles,
          industry: sponsorData.industry,
          required_skills: sponsorData.required_skills,
        };

        // Send the request to match candidates
        const matchResponse = await axios.post(
          "http://localhost:8000/sponsor/matches/",
          requestBody,
          {
            headers: {
              Authorization: `Token ${token}`,
              "X-CSRFToken": csrfToken,
              "Content-Type": "application/json",
            },
          }
        );

        const matches = matchResponse.data; // Get the matched candidates with similarity scores

        // Fetch candidate profiles based on matched candidate IDs
        const candidateProfiles = await Promise.all(
          matches.map(async (match) => {
            const candidateResponse = await axios.get(
              `http://localhost:8000/candidates/${match.candidate_id}/`,
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "X-CSRFToken": csrfToken,
                  "Content-Type": "application/json",
                },
              }
            );
            return { ...candidateResponse.data, similarity: match.similarity }; // Add similarity score to candidate data
          })
        );

        setCandidates(candidateProfiles); // Set the fetched candidates with similarity scores
      } catch (error) {
        console.error("Error fetching candidates:", error);
        setError("Failed to load candidates."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCandidates();
  }, []);

  // Sorting function
  const sortedCandidates = () => {
    let sorted = [...candidates];
    if (sortOption === "matchScore") {
      sorted.sort((a, b) => b.similarity - a.similarity); // Sort by similarity score
    } else if (sortOption === "experience") {
      sorted.sort((a, b) => b.years_of_experience - a.years_of_experience); // Sort by experience
    }
    return sorted.filter((candidate) =>
      filterLocation ? candidate.location_preference === filterLocation : true
    ); // Filter by location if specified
  };

  if (loading) return <p>Loading candidates...</p>; // Show loading message
  if (error) return <p>{error}</p>; // Show error message

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Filter candidates based on the search term
    const filtered = candidates.filter((candidate) =>
      candidate.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCandidates(filtered.slice(0, 3)); // Limit to 3 results
  };

  const handleSearchOpen = () => {
    setOpenSearch(true);
  };

  const handleSearchClose = () => {
    setOpenSearch(false);
    setSearchTerm("");
    setFilteredCandidates([]);
  };

  const handleClickOpen = (candidate) => {
    setSelectedCandidateId(candidate.id_can); // Set the selected candidate ID using id_can
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSubject("");
    setMessage("");
  };

  const handleSend = async () => {
    if (!selectedCandidateId) return; // Ensure a candidate ID is selected
    try {
      const token = localStorage.getItem("authToken");
      const csrfToken = Cookies.get("csrftoken");
      const response = await axios.post(
        "http://localhost:8000/send-message/",
        {
          candidate_id: selectedCandidateId, // Use the selected candidate's ID
          subject: subject,
          message: message,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data.message); // Show success message
      handleClose(); // Close the popup
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message."); // Show error message
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Filter Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search candidates..."
          className="w-full p-2 border rounded-lg"
          onFocus={handleSearchOpen} // Open search dialog on focus
          onChange={handleSearchChange} // Update search term
        />
        <div className="mt-4 flex space-x-4">
          <select
            className="p-2 border rounded-lg"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)} // Update sort option
          >
            <option value="matchScore">Sort by Match Score</option>
            <option value="experience">Sort by Experience</option>
          </select>
          <select
            className="p-2 border rounded-lg"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)} // Update filter location
          >
            <option value="">Filter by Location</option>
            <option value="New York">New York</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Boston">Boston</option>
          </select>
        </div>
      </div>

      {/* Candidate List */}
      <div className="space-y-6">
        {sortedCandidates().length > 0 ? ( // Use sorted and filtered candidates
          sortedCandidates().map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 rounded-full h-12 w-12 flex-shrink-0 flex items-center justify-center text-xl">
                  <FaUserGraduate className="text-gray-600" /> {/* User icon */}
                </div>
                <div>
                  <h2 className="font-bold text-xl">{candidate.name}</h2>
                  <p className="text-gray-600">{candidate.job_title}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600">
                  Location: {candidate.location_preference}
                </p>
                <p className="text-gray-600">
                  Experience: {candidate.years_of_experience} years
                </p>
                <p className="text-gray-600">Degree: {candidate.degree}</p>
                <p className="text-gray-600">
                  Institution: {candidate.institution}
                </p>
                <div className="mt-2">
                  <span className="font-semibold">Skills: </span>
                  {candidate.technical_skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Similarity Score:</p>
                    <p className="text-gray-600 font-bold">
                      {candidate.similarity.toFixed(2)}%
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${candidate.similarity}%` }} // Set width based on similarity score
                    ></div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    View Profile
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    onClick={() => handleClickOpen(candidate)} // Pass candidate to the function
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No candidates found.</p> // Fallback message if no candidates
        )}
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" component="span">
            Send Message
          </Typography>
          <Button
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            &times; {/* Cross button */}
          </Button>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Subject"
            type="text"
            fullWidth
            variant="outlined"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button onClick={handleSend} color="primary">
                  Send
                </Button>
              ),
            }}
          />
          <TextField
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openSearch}
        onClose={handleSearchClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">Search Results</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            placeholder="Type to search..."
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            margin="normal"
          />
          <List>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate) => (
                <ListItem
                  button
                  key={candidate.id}
                  onClick={() => console.log(`Selected: ${candidate.name}`)}
                >
                  <ListItemText
                    primary={candidate.name}
                    secondary={candidate.jobTitle}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No candidates found.</Typography>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSearchClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CandidateList;
