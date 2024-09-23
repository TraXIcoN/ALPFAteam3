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
    companyWebsite: "",
    jobTitle: "",
    workEnvironment: "",
    salaryRange: "",
    openRoles: ["Other"],
    requiredSkills: ["Communication"],
    experienceLevel: "",
    companyBenefits: ["Health Insurance", "Flexible Work Hours"],
    growthOpportunities: "",
  });

  console.log(formData);

  const [loading, setLoading] = useState(true);

  // Handle checkbox change
  const handleCheckboxChange = (name) => (event) => {
    console.log(event); // Log the event to see its structure
    if (!event || !event.target) {
      console.error("Event or event.target is undefined");
      return; // Exit if the event target is not defined
    }
    const { value, checked } = event.target; // Accessing event.target
    setFormData((prevData) => {
      const newValue = checked
        ? [...prevData[name], value]
        : prevData[name].filter((item) => item !== value);
      return { ...prevData, [name]: newValue };
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
      const {
        company_website = "https://www.linkedin.com/in/adityamohan16/", // Default to empty string if null
        job_title = "Full Stack developer", // Default to empty string if null
        work_environment = "In_office", // Default to empty string if null
        salary_range = "10-20", // Default to empty string if null
        open_roles = ["Other"], // Default to ["Other"] if null
        required_skills = ["Communication"], // Default to ["Communication"] if null
        experience_level = "", // Default to empty string if null
        company_benefits = ["Health Insurance", "Flexible Work Hours"], // Default to this array if null
        growth_opportunities = "", // Default to empty string if null
      } = null;

      // Set formData with destructured values
      setFormData({
        companyWebsite: company_website,
        jobTitle: job_title,
        workEnvironment: work_environment,
        salaryRange: salary_range,
        openRoles: open_roles,
        requiredSkills: required_skills,
        experienceLevel: experience_level,
        companyBenefits: company_benefits,
        growthOpportunities: growth_opportunities,
      });
      setFormData(response.data); // Assuming the response data matches the formData structure
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target; // Ensure event.target is defined
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const csrfToken = Cookies.get("csrftoken");
      const response = await axios.put(
        "http://localhost:8000/candidate/profile/edit/",
        formData, // Ensure formData has the correct values
        {
          headers: {
            Authorization: `Token ${token}`,
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
        }
      );
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
          name="companyWebsite"
          value={formData.companyWebsite}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Job Title"
          variant="outlined"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Work Environment"
          variant="outlined"
          name="workEnvironment"
          value={formData.workEnvironment}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Salary Range"
          variant="outlined"
          name="salaryRange"
          value={formData.salaryRange}
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
                  checked={formData.openRoles.includes(role)}
                  onChange={handleCheckboxChange("openRoles")}
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
                  checked={formData.requiredSkills.includes(skill)}
                  onChange={handleCheckboxChange("requiredSkills")}
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
          name="experienceLevel"
          value={formData.experienceLevel}
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
                  checked={formData.companyBenefits.includes(benefit)}
                  onChange={handleCheckboxChange("companyBenefits")}
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
          name="growthOpportunities"
          value={formData.growthOpportunities}
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
