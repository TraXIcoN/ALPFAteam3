import React from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Checkbox, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '@fortawesome/fontawesome-free/css/all.min.css';
import alpfalogo from '../src/alpfalogo.png';
const Login = () => {
  return (
    <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: '2rem', display: 'flex', flexDirection: 'row', width: '100%' }}>
        {/* Left Section with Image */}
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          <img src={alpfalogo} alt="Illustration" style={{ width: '100%', height: 'auto'  }} />
        </Box>
        {/* Right Section with Form */}
        <Box flex={1}>
          <Typography variant="h5" gutterBottom align="center">
            Sign in with
          </Typography>
          <Box display="flex" justifyContent="center" marginBottom="1rem">
            <FacebookIcon style={{ color: '#3b5998', marginRight: '10px' }} />
            <TwitterIcon style={{ color: '#00acee', marginRight: '10px' }} />
            <LinkedInIcon style={{ color: '#0e76a8' }} />
          </Box>
          <Typography variant="body1" align="center">Or</Typography>
          <form style={{ marginTop: '1rem' }}>
            <TextField fullWidth label="Email address" variant="outlined" margin="normal" />
            <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <Checkbox color="primary" />
                <Typography variant="body2">Remember me</Typography>
              </Box>
              <Link href="#" variant="body2">Forgot password?</Link>
            </Box>
            <Button fullWidth variant="contained" color="primary" style={{ marginTop: '1rem' }}>
              Login
            </Button>
          </form>
          <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
            Don't have an account? <Link href="Signup">Register</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
