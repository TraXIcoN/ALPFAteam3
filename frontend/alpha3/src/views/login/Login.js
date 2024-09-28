import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Checkbox,
  Link,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "@fortawesome/fontawesome-free/css/all.min.css";
import alpfalogo from "../../assets/alpfalogo.png";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Determine if the user is logging in with email or username
      const loginData = {
        password: formData.password,
      };

      // Check if email is provided, if so, use it for login
      if (formData.email) {
        loginData.email = formData.email; // Use email for login
      } else if (formData.username) {
        loginData.username = formData.username; // Use username for login
      } else {
        alert("Please provide either an email or a username.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/login/",
        loginData
      );

      // Assuming the response contains the user data and token
      console.log(response.data);
      const { userId, username, token } = response.data; // Adjust based on your API response structure

      // Store the token, username in local storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username); // Store the username
      localStorage.setItem("userId", userId);

      console.log("Logged in username:", username);

      await checkCandidateInDatabase(username); // Assume this function checks the database
    } catch (error) {
      console.error("Error logging in:", error);
      alert(
        "Error logging in: " +
          (error.response?.data?.error || "Invalid credentials")
      );
    }
  };
  // Function to check if candidate exists in the database
  const checkCandidateInDatabase = async (username) => {
    const userId = localStorage.getItem("userId"); // Assuming userId is stored in local storage
    if (userId) {
      formData.user = userId; // Add user ID to formData
    } else {
      alert("User ID is missing. Please log in again or Signup!");
      return; // Stop submission if user ID is not found
    }

    try {
      const token = localStorage.getItem("authToken");
      const csrfToken = Cookies.get("csrftoken");
      const response = await axios.put(
        "http://localhost:8000/candidate/profile/",
        formData, // Ensure formData has the correct values
        {
          headers: {
            Authorization: `Token ${token}`,
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/Typeformembed"); // Redirect if candidate does not exist
    } catch (error) {
      // Navigate to CandidateDashboard after successful login
      navigate("/CandidateDashboard"); // Redirect to CandidateDashboard
      if (error.response && error.response.status === 404) {
        return null; // Return null if a 404 error occurs
      }
      console.error("Error checking candidate:", error);
      return false; // Return false for other errors
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        {/* Left Section with Image */}
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={alpfalogo}
            alt="Illustration"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
        {/* Right Section with Form */}
        <Box flex={1}>
          <Typography variant="h5" gutterBottom align="center">
            Sign in with
          </Typography>
          <Box display="flex" justifyContent="center" marginBottom="1rem">
            <FacebookIcon style={{ color: "#3b5998", marginRight: "10px" }} />
            <TwitterIcon style={{ color: "#00acee", marginRight: "10px" }} />
            <LinkedInIcon style={{ color: "#0e76a8" }} />
          </Box>
          <Typography variant="body1" align="center">
            Or
          </Typography>
          <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              name="email"
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              name="password"
              onChange={handleChange}
              required
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center">
                <Checkbox color="primary" />
                <Typography variant="body2">Remember me</Typography>
              </Box>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem" }}
              type="submit"
            >
              Login
            </Button>
          </form>
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "1rem" }}
          >
            Don't have an account? <Link href="/Corspage">Register</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
