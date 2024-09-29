import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  Typography,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const ViewSponsorProfile = () => {
  const [formData, setFormData] = useState({
    company_website: "",
    job_title: "",
    work_environment: "",
    salary_range: "",
    open_roles: [],
    required_skills: [],
    experience_level: "",
    company_benefits: [],
    growth_opportunities: "",
  });

  const [loading, setLoading] = useState(true);

  // Handle checkbox change
  const handleCheckboxChange = (name) => (event) => {
    const { value, checked } = event.target; // Accessing event.target
    setFormData((prevData) => {
      // Ensure prevData[name] is an array
      const currentValues = Array.isArray(prevData[name]) ? prevData[name] : [];
      const newValue = checked
        ? [...currentValues, value] // Add value if checked
        : currentValues.filter((item) => item !== value); // Remove value if unchecked
      return { ...prevData, [name]: newValue }; // Update state
    });
  };

  // Fetch user profile data
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const csrfToken = Cookies.get("csrftoken");
      const response = await axios.get(
        "http://localhost:8000/sponsor/profile/",
        {
          headers: {
            Authorization: `Token ${token}`,
            "X-CSRFToken": csrfToken,
          },
        }
      );

      console.log("Fetched Profile Data:", response.data); // Log the response data

      setFormData(response.data); // Update state with fetched data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target; // Get the name and value from the event
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Update the state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add user to formData
    const userId = localStorage.getItem("userId"); // Assuming userId is stored in local storage
    if (userId) {
      formData.user = userId; // Add user ID to formData
    } else {
      alert("User ID is missing. Please log in again.");
      return; // Stop submission if user ID is not found
    }

    console.log(formData);

    try {
      const token = localStorage.getItem("authToken");
      console.log(token);
      const csrfToken = Cookies.get("csrftoken");
      const response = await axios.put(
        "http://localhost:8000/sponsor/profile/edit/",
        formData, // Ensure formData has the correct values
        {
          headers: {
            Authorization: `Token ${token}`,
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(
        "Error updating profile: " +
          (error.response?.data?.error || "An error occurred")
      );
    }
  };

  useEffect(() => {
    fetchProfileData(); // Fetch profile data on component mount
  }, []);

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sponsor Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Company Website"
          variant="outlined"
          name="company_website"
          value={formData.company_website || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Job Title"
          variant="outlined"
          name="job_title"
          value={formData.job_title || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Work Environment"
          variant="outlined"
          name="work_environment"
          value={formData.work_environment}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Salary Range"
          variant="outlined"
          name="salary_range"
          value={formData.salary_range || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
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
                  checked={
                    Array.isArray(formData.open_roles) &&
                    formData.open_roles.includes(role)
                  } // Check for openRoles
                  onChange={handleCheckboxChange("open_roles")}
                  value={role}
                />
              }
              label={role}
            />
          ))}
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Required Skills</FormLabel>
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
                  checked={
                    Array.isArray(formData.required_skills) &&
                    formData.required_skills.includes(skill)
                  } // Check for requiredSkills
                  onChange={handleCheckboxChange("required_skills")}
                  value={skill}
                />
              }
              label={skill}
            />
          ))}
        </FormControl>
        <TextField
          label="Experience Level"
          variant="outlined"
          name="experience_level"
          value={formData.experience_level}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
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
                  checked={
                    Array.isArray(formData.company_benefits) &&
                    formData.company_benefits.includes(benefit)
                  } // Check for companyBenefits
                  onChange={handleCheckboxChange("company_benefits")}
                  value={benefit}
                />
              }
              label={benefit}
            />
          ))}
        </FormControl>
        <TextField
          label="Growth Opportunities"
          variant="outlined"
          name="growth_opportunities"
          value={formData.growth_opportunities}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button variant="contained" color="primary" type="submit">
            Save Changes
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ViewSponsorProfile;
