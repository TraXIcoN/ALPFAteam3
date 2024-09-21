import React from 'react';
import { Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';

const Signup = () => {
  return (
    <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h5" gutterBottom align="center">
          Create an Account
        </Typography>
        <form style={{ marginTop: '1rem' }}>
          <TextField fullWidth label="Full Name" variant="outlined" margin="normal" />
          <TextField fullWidth label="Email address" variant="outlined" margin="normal" />
          <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" />
          <TextField fullWidth label="Confirm Password" type="password" variant="outlined" margin="normal" />
          <Button fullWidth variant="contained" color="primary" style={{ marginTop: '1rem' }}>
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
          {/* Already have an account? <a href="/">Login</a> */}
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Signup;
