import React, { useState } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  MenuItem,
  FormControl,
  FormLabel,
  Typography,
  LinearProgress,
  Paper,
} from "@mui/material";
import {
  Person,
  Work,
  School,
  Business,
  Mail, // Added Mail icon
  LinkedIn, // Added LinkedIn icon
  Link, // Added Link icon
  AccessTime, // Added AccessTime icon
  CalendarToday, // Added CalendarToday icon
  Code, // Added Code icon
  ThumbUp, // Added ThumbUp icon
  Comment, // Added Comment icon
  People, // Added People icon for soft skills
  Home, // Added Home icon for work environment
  Flag, // Added Flag icon for career goals
  Star, // Added Star icon for values
  Group, // Added Group icon for team preferences
  LocationOn, // Added LocationOn icon for location preference
  Public, // Added Public icon for relocation
} from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";

const steps = [
  {
    question: "What is your full name?",
    icon: <Person />,
    input: (value, onChange) => (
      <TextField
        label="Full Name"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What is your contact information?",
    icon: <Mail />, // Assuming you have an icon for contact
    input: (value, onChange) => (
      <TextField
        label="Contact Info"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What is your LinkedIn profile?",
    icon: <LinkedIn />, // Assuming you have an icon for LinkedIn
    input: (value, onChange) => (
      <TextField
        label="LinkedIn Profile"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What is your portfolio link?",
    icon: <Link />, // Assuming you have an icon for portfolio
    input: (value, onChange) => (
      <TextField
        label="Portfolio"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What is your current job title (if applicable)?",
    icon: <Work />,
    input: (value, onChange) => (
      <TextField
        label="Current Job Title"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What industry do you work in?",
    icon: <Business />, // Assuming you have an icon for industry
    input: (value, onChange) => (
      <TextField
        label="Industry"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "How many years of experience do you have?",
    icon: <AccessTime />, // Assuming you have an icon for experience
    input: (value, onChange) => (
      <TextField
        label="Years of Experience"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What is your highest level of education?",
    icon: <School />,
    input: (value, onChange) => (
      <TextField
        select
        label="Highest Level of Education"
        value={value || ""}
        onChange={onChange}
        fullWidth
      >
        {[
          "High School Diploma",
          "Associate Degree",
          "Bachelor's Degree",
          "Master's Degree",
          "PhD or Doctorate",
          "Other",
        ].map((level) => (
          <MenuItem key={level} value={level}>
            {level}
          </MenuItem>
        ))}
      </TextField>
    ),
  },
  {
    question: "What certifications do you have?",
    icon: <Paper />, // Assuming you have an icon for certification
    input: (value, onChange) => (
      <TextField
        label="Certification"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "Which institution did you graduate from?",
    icon: <School />, // Assuming you have an icon for institution
    input: (value, onChange) => (
      <TextField
        label="Institution"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What year did you graduate?",
    icon: <CalendarToday />, // Assuming you have an icon for graduation year
    input: (value, onChange) => (
      <TextField
        label="Graduation Year"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What technical skills do you possess?",
    icon: <Code />, // Assuming you have an icon for technical skills
    input: (value, onChange) => (
      <TextField
        label="Technical Skills"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "Which of these soft skills best describes you? (Select 3)",
    input: (value, onChange) => (
      <FormControl component="fieldset">
        <FormLabel component="legend">Soft Skills</FormLabel>
        {[
          "Communication",
          "Problem-solving",
          "Leadership",
          "Teamwork",
          "Creativity",
          "Adaptability",
        ].map((skill) => (
          <FormControlLabel
            key={skill}
            control={
              <Checkbox
                checked={Array.isArray(value) && value.includes(skill)}
                onChange={onChange} // Ensure this is set correctly
                name={skill} // Ensure this is set correctly
              />
            }
            label={skill}
          />
        ))}
      </FormControl>
    ),
  },
  {
    question: "What industries are you most interested in pursuing?",
    input: (value, onChange) => (
      <FormControl component="fieldset">
        <FormLabel component="legend">Interested Industries</FormLabel>
        {[
          "Finance",
          "Technology",
          "Healthcare",
          "Consulting",
          "Marketing & Advertising",
          "Other",
        ].map((industry) => (
          <FormControlLabel
            key={industry}
            control={
              <Checkbox
                checked={Array.isArray(value) && value.includes(industry)}
                onChange={onChange} // Ensure this is set correctly
                name={industry} // Ensure this is set correctly
              />
            }
            label={industry}
          />
        ))}
      </FormControl>
    ),
  },
  {
    question: "What is your preferred role type?",
    input: (value, onChange) => (
      <RadioGroup value={value || ""} onChange={onChange}>
        {["Full-time", "Part-time", "Contract", "Internship"].map((role) => (
          <FormControlLabel
            key={role}
            value={role}
            control={<Radio />}
            label={role}
          />
        ))}
      </RadioGroup>
    ),
  },
  {
    question: "What kind of work environment do you prefer?",
    input: (value, onChange) => (
      <RadioGroup value={value || ""} onChange={onChange}>
        {["Remote", "In-office", "Hybrid"].map((env) => (
          <FormControlLabel
            key={env}
            value={env}
            control={<Radio />}
            label={env}
          />
        ))}
      </RadioGroup>
    ),
  },
  {
    question: "What are your career goals in the next 2-5 years?",
    input: (value, onChange) => (
      <TextField
        label="Career Goals"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
        multiline
        rows={4}
      />
    ),
  },
  {
    question: "Which company values are most important to you?",
    input: (value, onChange) => (
      <FormControl component="fieldset">
        <FormLabel component="legend">Company Values</FormLabel>
        {[
          "Work-life balance",
          "Diversity & Inclusion",
          "Innovation & Creativity",
          "Collaboration",
          "Professional development opportunities",
          "Community involvement",
        ].map((values) => (
          <FormControlLabel
            key={values}
            control={
              <Checkbox
                checked={Array.isArray(value) && value.includes(values)}
                onChange={onChange} // Ensure this is set correctly
                name={values} // Ensure this is set correctly
              />
            }
            label={values}
          />
        ))}
      </FormControl>
    ),
  },
  {
    question: "How do you typically like to work?",
    input: (value, onChange) => (
      <RadioGroup value={value || ""} onChange={onChange}>
        {[
          "Independently",
          "In small teams",
          "In large groups",
          "Flexible/adaptable to situations",
        ].map((workStyle) => (
          <FormControlLabel
            key={workStyle}
            value={workStyle}
            control={<Radio />}
            label={workStyle}
          />
        ))}
      </RadioGroup>
    ),
  },
  {
    question: "Any location preference?",
    input: (value, onChange) => (
      <TextField
        label="Career Goals"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
        multiline
        rows={4}
      />
    ),
  },
  {
    question: "Are you open to relocation?",
    input: (value, onChange) => (
      <RadioGroup value={value || ""} onChange={onChange}>
        {["Yes", "No", "Maybe"].map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    ),
  },
  {
    question: "What is your avilability?",
    input: (value, onChange) => (
      <RadioGroup value={value || ""} onChange={onChange}>
        {["Full-time", "Part-time", "Contract", "Intern"].map((style) => (
          <FormControlLabel
            key={style}
            value={style}
            control={<Radio />}
            label={style}
          />
        ))}
      </RadioGroup>
    ),
  },
  {
    question: "What endorsements do you have?",
    icon: <ThumbUp />, // Assuming you have an icon for endorsements
    input: (value, onChange) => (
      <TextField
        label="Endorsements"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
];

const Typeformembed = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(Array(steps.length).fill("")); // Ensure proper initialization

  const handleChange = (index) => (event) => {
    const newFormData = [...formData];

    // Check if event and event.target are defined
    if (!event || !event.target) return;

    const value = newFormData[index];

    if (event.target.type === "checkbox") {
      const checkboxValue = event.target.name;
      newFormData[index] = Array.isArray(value) ? value : [];

      if (event.target.checked) {
        newFormData[index].push(checkboxValue);
      } else {
        newFormData[index] = newFormData[index].filter(
          (item) => item !== checkboxValue
        );
      }
    } else {
      newFormData[index] = event.target.value;
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const csrfToken = Cookies.get("csrftoken"); // Get the CSRF token from cookies
      const token = localStorage.getItem("authToken"); // Retrieve the token from local storage
      const response = await axios.post(
        "http://localhost:8000/candidate/profile/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`, // Include the token in the headers
            "X-CSRFToken": csrfToken, // Include the CSRF token in the headers
            "Content-Type": "application/json", // Set content type if needed
          },
        }
      );

      console.log("Candidate data submitted:", response.data);
      alert("Profile created successfully!");
    } catch (error) {
      console.error("Error submitting candidate data:", error);
      alert(
        "Error submitting data: " +
          (error.response?.data?.error || "An error occurred")
      );
    }
  };

  const nextStep = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(150deg, #7795f8 15%, #6772e5 70%, #555abf 94%)",
        padding: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background circles */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Header */}
      <Typography
        variant="h3"
        sx={{ color: "white", mb: 4, fontWeight: "bold", textAlign: "center" }}
      >
        Profile
      </Typography>

      {/* Main content wrapped in a form */}
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 600,
            borderRadius: 4,
            overflow: "hidden",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <LinearProgress
            variant="determinate"
            value={(step / (steps.length - 1)) * 100}
            sx={{
              height: 16,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              "& .MuiLinearProgress-bar": { backgroundColor: "green" },
            }}
          />
          <Container maxWidth="sm" sx={{ py: 4 }}>
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: "#32325d",
                mb: 3,
              }}
            >
              {steps[step].question}
            </Typography>
            {steps[step].input(formData[step], handleChange(step))}
            <Box
              sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}
            >
              {step > 0 && (
                <Button variant="outlined" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {step < steps.length - 1 ? (
                <Button variant="contained" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  type="submit" // Ensure this is the only button that submits the form
                >
                  Submit
                </Button>
              )}
            </Box>
          </Container>
        </Paper>
      </form>
    </Box>
  );
};

export default Typeformembed;
