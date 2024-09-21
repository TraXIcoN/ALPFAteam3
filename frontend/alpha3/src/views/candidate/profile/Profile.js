import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  Link
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';

const theme = createTheme({
  palette: {
    primary: {
      main: '#69bcf0', // Yellow color
    },
    background: {
      default: '#69bcf0',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const Profile = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 4 }}
          >
            Effective career recommendations with real results
          </Typography>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'white',
              borderRadius: 2,
            }}
          >
            <AssignmentIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="body1" align="center" paragraph>
            Share what you enjoy about our quiz and uncover your ideal job matches. With Alpfa, discover relevant opportunities at the most exciting startups
            </Typography>
            <Button
              variant="contained"
              color="#f2a5e5"
              size="large"
              sx={{ mt: 2, textTransform: 'none' }}
            >
            <Link href="Typeformembed" color="inherit">
              Let's get started
            </Link>
            </Button>
          </Paper>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link href="Login" color="inherit" underline="always">
              I already have an account
            </Link>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Profile;