import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/signup/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log("User created:", response.data);
      // Redirect to login page after successful signup
      navigate("/Profile"); // Use navigate to redirect to the login page
    } catch (error) {
      console.error("Error creating user:", error);
      alert(
        "Error creating user: " +
          (error.response?.data?.error || "An error occurred")
      );
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h5" gutterBottom align="center">
          Create an Account
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            name="username"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Email address"
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
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            name="confirmPassword"
            onChange={handleChange}
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
            type="submit"
          >
            Sign Up
          </Button>
        </form>
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "1rem" }}
        >
          Already have an account? <Link href="/login">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Signup;
