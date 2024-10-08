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
    question: "What is your company's website?",
    input: (value, onChange) => (
      <TextField
        label="Company Website"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What is the job title for the role offered?",
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
    question:
      "What is your work environment like (e.g., in-office, remote, hybrid)?",
    input: (value, onChange) => (
      <TextField
        select
        label="Work Environment"
        value={value || ""}
        onChange={onChange}
        fullWidth
      >
        {["In-office", "Remote", "Hybrid"].map((environment) => (
          <MenuItem key={environment} value={environment}>
            {environment}
          </MenuItem>
        ))}
      </TextField>
    ),
  },
  {
    question: "What is the salary range for this role?",
    input: (value, onChange) => (
      <TextField
        label="Salary Range"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What roles are currently open in your organization?",
    input: (value, onChange) => (
      <FormControl component="fieldset">
        <FormLabel component="legend">Open Roles</FormLabel>
        {[
          "Finance",
          "Technology",
          "Healthcare",
          "Consulting",
          "Marketing & Advertising",
          "Other",
        ].map((role) => (
          <FormControlLabel
            key={role}
            control={
              <Checkbox
                checked={Array.isArray(value) && value.includes(role)}
                onChange={(event) => {
                  const newValue = event.target.checked
                    ? [...(value || []), role]
                    : value.filter((item) => item !== role);
                  onChange(newValue);
                }}
                name={role}
              />
            }
            label={role}
          />
        ))}
      </FormControl>
    ),
  },
  {
    question:
      "What technical skills are required for the roles you're offering?",
    input: (value, onChange) => (
      <FormControl component="fieldset">
        <FormLabel component="legend">Required Technical Skills</FormLabel>
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
                onChange={(event) => {
                  const newValue = event.target.checked
                    ? [...(value || []), skill]
                    : value.filter((item) => item !== skill);
                  onChange(newValue);
                }}
                name={skill}
              />
            }
            label={skill}
          />
        ))}
      </FormControl>
    ),
  },
  {
    question: "What is your preferred range of experience for candidates?",
    input: (value, onChange) => (
      <RadioGroup value={value || ""} onChange={onChange}>
        {["Entry-level", "Mid-level", "Senior-level", "Executive-level"].map(
          (level) => (
            <FormControlLabel
              key={level}
              value={level}
              control={<Radio />}
              label={level}
            />
          )
        )}
      </RadioGroup>
    ),
  },
  {
    question:
      "Are there any specific company benefits you'd like to highlight?",
    input: (value, onChange) => (
      <FormControl component="fieldset">
        <FormLabel component="legend">Company Benefits</FormLabel>
        {[
          "Health Insurance",
          "401(k) Matching",
          "Flexible Work Hours",
          "Other",
        ].map((benefit) => (
          <FormControlLabel
            key={benefit}
            control={
              <Checkbox
                checked={Array.isArray(value) && value.includes(benefit)}
                onChange={(event) => {
                  const newValue = event.target.checked
                    ? [...(value || []), benefit]
                    : value.filter((item) => item !== benefit);
                  onChange(newValue);
                }}
                name={benefit}
              />
            }
            label={benefit}
          />
        ))}
      </FormControl>
    ),
  },
  {
    question:
      "Does your company offer any growth opportunities for employees? If yes, please describe.",
    input: (value, onChange) => (
      <TextField
        label="Growth Opportunities"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
        multiline
        rows={4}
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
