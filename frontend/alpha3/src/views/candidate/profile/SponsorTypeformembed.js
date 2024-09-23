import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

// Set up Axios interceptor
axios.interceptors.request.use(
  (config) => {
    const csrfToken = Cookies.get("csrftoken"); // Get the CSRF token from cookies
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken; // Set the CSRF token in the headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const steps = [
  {
    question: "What is your full name?",
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
    question: "What is your LinkedIn profile URL?",
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
    question: "What is your portfolio URL?",
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
    question: "What is your current job title?",
    input: (value, onChange) => (
      <TextField
        label="Job Title"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What industry do you work in?",
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
    input: (value, onChange) => (
      <TextField
        label="Years of Experience"
        variant="outlined"
        type="number"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What is your highest level of education?",
    input: (value, onChange) => (
      <TextField
        label="Degree"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What certification do you have (if any)?",
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
    question: "What institution did you graduate from?",
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
    input: (value, onChange) => (
      <TextField
        label="Graduation Year"
        variant="outlined"
        type="number"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What are your technical skills?",
    input: (value, onChange) => (
      <TextField
        label="Technical Skills"
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
    question: "What are your soft skills?",
    input: (value, onChange) => (
      <TextField
        label="Soft Skills"
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
    question: "What is your preferred industry?",
    input: (value, onChange) => (
      <TextField
        label="Preferred Industry"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What is your preferred role?",
    input: (value, onChange) => (
      <TextField
        label="Preferred Role"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What is your preferred work environment?",
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
    question: "What are your career goals?",
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
    question: "What are your values?",
    input: (value, onChange) => (
      <TextField
        label="Values"
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
    question: "What are your team preferences?",
    input: (value, onChange) => (
      <TextField
        label="Team Preferences"
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
    question: "What is your location preference?",
    input: (value, onChange) => (
      <TextField
        label="Location Preference"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "Are you open to relocation?",
    input: (value, onChange) => (
      <RadioGroup value={value || ""} onChange={onChange}>
        {["Yes", "No"].map((option) => (
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
    question: "What is your availability?",
    input: (value, onChange) => (
      <RadioGroup value={value || ""} onChange={onChange}>
        {["Full-time", "Part-time", "Internship", "Contract"].map(
          (availability) => (
            <FormControlLabel
              key={availability}
              value={availability}
              control={<Radio />}
              label={availability}
            />
          )
        )}
      </RadioGroup>
    ),
  },
  {
    question: "Any endorsements or recommendations?",
    input: (value, onChange) => (
      <TextField
        label="Endorsements"
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
    question: "What is your preferred organization size?",
    input: (value, onChange) => (
      <TextField
        label="Preferred Organization Size"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
];

const SponsorTypeformembed = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(Array(steps.length).fill([])); // Initialize as arrays

  const handleChange = (index) => (event) => {
    const newFormData = [...formData];
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

  const nextStep = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  // Function to check if the user is logged in
  const isLoggedIn = () => {
    const token = localStorage.getItem("authToken"); // or use Cookies.get('authToken') if using cookies
    return token !== null; // Returns true if the token exists
  };

  // Log the username if the user is logged in
  useEffect(() => {
    if (isLoggedIn()) {
      const username = localStorage.getItem("username"); // Assuming you stored the username in local storage
      console.log("Logged in username:", username); // Log the username
    }
  }, []); // Empty dependency array to run once on component mount

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: 4,
        padding: 4,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        mt: 6,
      }}
    >
      <LinearProgress
        variant="determinate"
        value={(step / steps.length) * 100}
        sx={{
          mb: 3,
          height: 10,
          borderRadius: 5,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            borderRadius: 5,
            backgroundColor: "#1976d2", // Use primary theme color
          },
        }}
      />
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "#333333",
            letterSpacing: "0.5px",
          }}
        >
          {steps[step].question}
        </Typography>
        {isLoggedIn() ? (
          steps[step].input(formData[step], handleChange(step))
        ) : (
          <Typography variant="h6" color="error">
            You must be logged in to fill out this form. Please log in first.
          </Typography>
        )}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          {step > 0 && (
            <Button
              variant="outlined"
              onClick={prevStep}
              sx={{
                px: 3,
                py: 1,
                borderRadius: 50,
                textTransform: "none",
                borderColor: "#1976d2",
                color: "#1976d2",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  borderColor: "#1565c0",
                },
              }}
            >
              Previous
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={nextStep}
              sx={{
                px: 3,
                py: 1,
                borderRadius: 50,
                backgroundColor: "#1976d2",
                color: "#fff",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{
                px: 3,
                py: 1,
                borderRadius: 50,
                textTransform: "none",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SponsorTypeformembed;
