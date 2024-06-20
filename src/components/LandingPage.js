import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Grid, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MenuIcon from '@mui/icons-material/Menu';
import Carousel from 'react-material-ui-carousel';
import './LandingPage.css';
import Logo from './images/guard.png';
import Slide1 from './images/note.jpg';
import Slide2 from './images/Slide2.png';

const slides = [
  { image: Slide1, title: "FitGuard", description: "Welcome to FitGuard, your ultimate companion for tracking your fitness journey. Stay on top of your calorie intake and achieve your health goals with ease." },
  { image: Slide2, title: "Track Your Progress", description: "Monitor your daily progress and stay motivated with our comprehensive tracking tools." },
];

const LandingPage = () => {
  return (
    <div className="landing-page">
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <img src={Logo} alt="Logo" className="logo" />
            <Typography variant="h6" className="title">
              FitGuard
            </Typography>
          </Box>
          <Button color="inherit" component={Link} to="/signin" className="sign-in-button">
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
      
      <Box className="navigation-bar">
        <Button component={Link} to="/" className="nav-button">HOME</Button>
        <Button component={Link} to="/shop" className="nav-button">SHOP</Button>
        <Button component={Link} to="/about" className="nav-button">ABOUT</Button>
        <Button component={Link} to="/contact" className="nav-button">CONTACT</Button>
        <Button component={Link} to="/faq" className="nav-button">FAQ</Button>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
      </Box>

      <Carousel interval={8000}>
        {slides.map((slide, index) => (
          <Box key={index} className="carousel-slide" style={{ backgroundImage: `url(${slide.image})` }}>
            <Box className="carousel-content">
              <Typography variant="h2" className="carousel-title">
                {slide.title}
              </Typography>
              <Typography variant="h5" className="carousel-description">
                {slide.description}
              </Typography>
              <Button variant="contained" color="primary" className="hero-button" component={Link} to="/signup">
                JOIN US NOW
              </Button>
            </Box>
          </Box>
        ))}
      </Carousel>

      <Grid container className="sections" spacing={3}>
        <Grid item xs={12} md={4} className="section">
          <Box className="section-content">
            <Typography variant="h5">PROGRESSION</Typography>
            <Typography variant="body1">Track your daily progress with our advanced tracking tools. Set your goals and watch as you achieve them step by step.</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} className="section">
          <Box className="section-content">
            <Typography variant="h5">WORKOUT</Typography>
            <Typography variant="body1">Get personalized workout plans tailored to your fitness level and goals. Stay fit and healthy with guided exercises and routines.</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} className="section">
          <Box className="section-content">
            <Typography variant="h5">NUTRITION</Typography>
            <Typography variant="body1">Monitor your diet with our calorie tracker. Get nutrition tips and healthy recipes to fuel your body the right way.</Typography>
          </Box>
        </Grid>
      </Grid>

      <Box className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FacebookIcon />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <TwitterIcon />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <InstagramIcon />
        </a>
      </Box>
    </div>
  );
};

export default LandingPage;
