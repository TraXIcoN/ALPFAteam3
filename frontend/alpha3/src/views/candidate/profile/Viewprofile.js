import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const ViewProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactInfo: "",
    linkedinProfile: "",
    portfolio: "",
    jobTitle: "",
    industry: "",
    yearsOfExperience: "",
    degree: "",
    certification: "",
    institution: "",
    graduationYear: "",
    technicalSkills: "",
    softSkills: "",
    preferredIndustry: "",
    preferredRole: "",
    preferredWorkEnvironment: "",
    careerGoals: "",
    values: "",
    teamPreferences: "",
    locationPreference: "",
    relocationOpen: "",
    availability: "",
    endorsements: "",
    preferredOrganizationSize: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch user profile data
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const csrfToken = Cookies.get("csrftoken");
      const response = await axios.get(
        "http://localhost:8000/candidate/profile/",
        {
          headers: {
            Authorization: `Token ${token}`,
            "X-CSRFToken": csrfToken,
          },
        }
      );
      setFormData(response.data); // Assuming the response data matches the formData structure
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        Edit Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <TextField
            key={key}
            label={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())} // Format label
            variant="outlined"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline={[
              "technicalSkills",
              "softSkills",
              "careerGoals",
              "values",
              "teamPreferences",
            ].includes(key)}
            rows={
              [
                "technicalSkills",
                "softSkills",
                "careerGoals",
                "values",
                "teamPreferences",
              ].includes(key)
                ? 4
                : 1
            }
          />
        ))}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button variant="contained" color="primary" type="submit">
            Save Changes
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ViewProfile;
