import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import './Hero.css';

const Hero = () => {
  return (
    <Box className="hero-container">
      <Typography variant="h2" className="hero-title">
        Title Here
      </Typography>
      <Typography variant="h5" className="hero-description">
        Description Here
      </Typography>
      <Button variant="contained" color="primary" className="hero-button">
        JOIN US NOW
      </Button>
    </Box>
  );
};

export default Hero;
