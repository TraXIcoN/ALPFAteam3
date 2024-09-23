import React, { useState } from "react";
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

const CandidateList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const candidates = [
    {
      id: 1,
      name: "Aditya Mohan",
      jobTitle: "Full stack Developer",
      location: "Atlanta, USA",
      experience: "3 years",
      skills: ["Django", "Python", "Azure"],
      education: "M.Sc. Computer Science",
      matchScore: 87,
      major: "Computer Science",
      icon: <FaUserTie />,
    },
    {
      id: 2,
      name: "Jane Smith",
      jobTitle: "UI/UX Designer",
      location: "San Francisco, USA",
      experience: "5 years",
      skills: ["Figma", "Sketch", "Adobe XD"],
      education: "B.Des. Design",
      matchScore: 93,
      major: "Design",
      icon: <FaUserGraduate />,
    },
    {
      id: 3,
      name: "Mark Taylor",
      jobTitle: "Data Analyst",
      location: "Boston, USA",
      experience: "4 years",
      skills: ["Python", "SQL", "Tableau"],
      education: "B.Sc. Data Science",
      matchScore: 45,
      major: "Data Science",
      icon: <FaUserCog />,
    },
    {
      id: 4,
      name: "Emily Zhang",
      jobTitle: "Mechanical Engineer",
      location: "Seattle, USA",
      experience: "6 years",
      skills: ["SolidWorks", "AutoCAD", "MATLAB"],
      education: "B.Eng. Mechanical Engineering",
      matchScore: 75,
      major: "Mechanical Engineering",
      icon: <FaUserMd />,
    },
    {
      id: 5,
      name: "Michael Johnson",
      jobTitle: "Marketing Manager",
      location: "Los Angeles, USA",
      experience: "8 years",
      skills: ["SEO", "Google Analytics", "Content Marketing"],
      education: "BBA Marketing",
      matchScore: 85,
      major: "Marketing",
      icon: <FaUserSecret />,
    },
    {
      id: 6,
      name: "Linda White",
      jobTitle: "HR Specialist",
      location: "Chicago, USA",
      experience: "2 years",
      skills: ["Employee Relations", "Recruitment", "Payroll"],
      education: "BBA Human Resources",
      matchScore: 60,
      major: "Human Resources",
      icon: <FaUserTie />,
    },
    {
      id: 7,
      name: "Sophia Gomez",
      jobTitle: "Software Engineer",
      location: "Austin, USA",
      experience: "1 year",
      skills: ["Java", "Spring Boot", "AWS"],
      education: "B.Sc. Software Engineering",
      matchScore: 50,
      major: "Software Engineering",
      icon: <FaUserGraduate />,
    },
    {
      id: 8,
      name: "James Carter",
      jobTitle: "Civil Engineer",
      location: "Miami, USA",
      experience: "7 years",
      skills: ["AutoCAD", "Project Management", "Structural Analysis"],
      education: "B.Eng. Civil Engineering",
      matchScore: 90,
      major: "Civil Engineering",
      icon: <FaUserCog />,
    },
    {
      id: 9,
      name: "Lisa Brown",
      jobTitle: "Accountant",
      location: "Dallas, USA",
      experience: "4 years",
      skills: ["Excel", "QuickBooks", "Tax Preparation"],
      education: "B.Sc. Accounting",
      matchScore: 30,
      major: "Accounting",
      icon: <FaUserMd />,
    },
    {
      id: 10,
      name: "Daniel Green",
      jobTitle: "Product Manager",
      location: "Denver, USA",
      experience: "5 years",
      skills: ["Agile", "JIRA", "Scrum"],
      education: "MBA Product Management",
      matchScore: 95,
      major: "Product Management",
      icon: <FaUserSecret />,
    },
  ];

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSubject("");
    setMessage("");
  };

  const handleSend = () => {
    // Here you can handle the send action (e.g., API call)
    alert("Message sent!"); // Show message to user
    handleClose(); // Close the popup
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
          <select className="p-2 border rounded-lg">
            <option>Sort by Match Score</option>
            <option>Sort by Experience</option> {/* Correctly closed option */}
          </select>
          <select className="p-2 border rounded-lg">
            <option>Filter by Location</option>
            <option>New York</option>
            <option>San Francisco</option>
            <option>Boston</option>
          </select>
        </div>
      </div>

      {/* Candidate List */}
      <div className="space-y-6">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 rounded-full h-12 w-12 flex-shrink-0 flex items-center justify-center text-xl">
                {candidate.icon}
              </div>{" "}
              {/* Icon based on candidate */}
              <div>
                <h2 className="font-bold text-xl">{candidate.name}</h2>
                <p className="text-gray-600">{candidate.jobTitle}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">Location: {candidate.location}</p>
              <p className="text-gray-600">
                Experience: {candidate.experience}
              </p>
              <p className="text-gray-600">Education: {candidate.education}</p>
              <p className="text-gray-600">Major: {candidate.major}</p>
              <div className="mt-2">
                <span className="font-semibold">Skills: </span>
                {candidate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-gray-600">
                  Match Score: {candidate.matchScore}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`${
                      candidate.matchScore >= 70 ? "bg-green-500" : "bg-red-500"
                    } h-2.5 rounded-full`}
                    style={{ width: `${candidate.matchScore}%` }}
                  ></div>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  View Profile
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                  onClick={handleClickOpen}
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
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
