import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Paper,
  LinearProgress,
} from "@mui/material";
import axios from "axios"; // Import axios for API calls
import Cookies from "js-cookie"; // Import Cookies for CSRF token

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
        {["In_office", "Remote", "Hybrid"].map((environment) => (
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
        {["Entry_level", "Mid_level", "Senior_level", "Executive_level"].map(
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
  const [formData, setFormData] = useState(Array(steps.length).fill([]));

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
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const csrfToken = Cookies.get("csrftoken"); // Get CSRF token
      const token = localStorage.getItem("authToken"); // Get auth token from local storage
      const response = await axios.post(
        "http://localhost:8000/sponsor/profile/", // Update with your API endpoint
        formData,
        {
          headers: {
            Authorization: `Token ${token}`, // Include the token in the headers
            "X-CSRFToken": csrfToken, // Include the CSRF token in the headers
            "Content-Type": "application/json", // Set content type if needed
          },
        }
      );

      console.log("Sponsor data submitted:", response.data);
      console.log(response);
      alert("Profile created successfully!"); // Notify user of success
      navigate("/Sdashboard"); // Navigate to Sdashboard
    } catch (error) {
      console.error("Error submitting sponsor data:", error);
      alert(
        "Error submitting data: " +
          (error.response?.data?.error || "An error occurred")
      );
    }
  };

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

      {/* Main content */}
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
          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
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
                onClick={handleSubmit}
              >
                Submit
              </Button>
            )}
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default SponsorTypeformembed;
