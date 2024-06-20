import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Button, Alert, Container, Card, CardContent, IconButton, AppBar, Toolbar } from '@mui/material';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import FoodEntryForm from './FoodEntryForm';
import CalorieTracker from './CalorieTracker';
import FoodHistory from './FoodHistory';
import { signOut } from 'aws-amplify/auth';
import SettingsIcon from '@mui/icons-material/Settings';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ForumIcon from '@mui/icons-material/Forum';
import TimelineIcon from '@mui/icons-material/Timeline';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import './Dashboard.css';

const services = [
  { name: 'Personalized Diet Plans', description: 'Get diet plans tailored to your goals.', icon: <RestaurantMenuIcon />, link: '/dashboard/diet-plans' },
  { name: 'Fitness Programs', description: 'Discover workout plans.', icon: <FitnessCenterIcon />, link: '/dashboard/fitness-programs' },
  { name: 'Community Forum', description: 'Join the community discussions.', icon: <ForumIcon />, link: '/dashboard/community' },
  { name: 'Progress Tracker', description: 'Track your progress over time.', icon: <TimelineIcon />, link: '/dashboard/progress' },
  { name: 'Calorie Tracker', description: 'Log your meals and track your calorie intake.', icon: <FastfoodIcon />, link: '/dashboard/calorie-tracker' }
];

const Dashboard = () => {
  const [foodEntries, setFoodEntries] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addFoodEntry = (entry) => {
    setFoodEntries([...foodEntries, entry]);
    setTotalCalories(totalCalories + entry.calories);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/'); // Redirect to the landing page
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        // Simulate fetching users
        const usersData = [{ name: 'John Doe' }, { name: 'Jane Doe' }];
        setUsers(usersData);
      } catch (error) {
        setError('There was an error fetching the data!');
      }
    };

    getUsers();
  }, []);

  return (
    <Container className="dashboard-container">
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <Typography variant="h6" className="title">
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          Welcome to Your Dashboard
        </Typography>
        <IconButton color="primary" component={Link} to="/settings">
          <SettingsIcon />
        </IconButton>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}

      <Routes>
        <Route path="/" element={
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card className="dashboard-card">
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      {service.icon}
                      <Typography variant="h6" component="h2" ml={2}>
                        {service.name}
                      </Typography>
                    </Box>
                    <Typography variant="body1" mb={2}>
                      {service.description}
                    </Typography>
                    <Button component={Link} to={service.link} variant="contained" color="primary">
                      Go to {service.name}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        } />
        <Route path="calorie-tracker" element={
          <Box mt={4}>
            <Typography variant="h4" gutterBottom>
              Calorie Tracker
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <FoodEntryForm addFoodEntry={addFoodEntry} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <CalorieTracker totalCalories={totalCalories} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <FoodHistory foodEntries={foodEntries} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Users List</Typography>
                    <ul>
                      {users.map((user, index) => (
                        <li key={index}>{user.name}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        } />
      </Routes>
    </Container>
  );
};

export default Dashboard;
