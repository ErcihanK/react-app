import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, Alert, Container, Card, CardContent, AppBar, Toolbar } from '@mui/material';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import FoodEntryForm from './FoodEntryForm';
import CalorieTracker from './CalorieTracker';
import FoodHistory from './FoodHistory';
import { signOut } from 'aws-amplify/auth';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ForumIcon from '@mui/icons-material/Forum';
import TimelineIcon from '@mui/icons-material/Timeline';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Sidebar from './Sidebar';
import StatCard from './StatCard';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HotelIcon from '@mui/icons-material/Hotel';
import ActivityChart from './ActivityChart';
import RecommendedFood from './RecommendedFood';
import PopularTrainers from './PopularTrainers';
import ProfileSection from './ProfileSection';
import ScheduledWidget from './ScheduledWidget';
import OutputWidget from './OutputWidget';
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
    <div className="dashboard-layout">
      <Sidebar />
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

        <Box mb={2}>
          <Typography variant="h4" gutterBottom>
            Welcome to Your Dashboard
          </Typography>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <StatCard icon={<LocalFireDepartmentIcon />} value="65" label="Calories Burned" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard icon={<DirectionsRunIcon />} value="2.5 km" label="Steps Taken" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard icon={<HotelIcon />} value="8 Hours" label="Sleep" />
          </Grid>

          <Grid item xs={12}>
            <ActivityChart />
          </Grid>

          <Grid item xs={12}>
            <RecommendedFood />
          </Grid>

          <Grid item xs={12}>
            <PopularTrainers />
          </Grid>

          <Grid item xs={12} sm={6}>
            <ProfileSection
              name="Mike Rowe"
              weight="65 kg"
              height="178 cm"
              age="25"
              profilePicture="/path/to/profile-picture.jpg"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <ScheduledWidget />
          </Grid>

          <Grid item xs={12} sm={6}>
            <OutputWidget />
          </Grid>
        </Grid>

        <Box mt={4}>
          <Routes>
            <Route path="/" element={
              <Grid container spacing={2}>
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
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card>
                      <CardContent>
                        <FoodEntryForm addFoodEntry={addFoodEntry} />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card>
                      <CardContent>
                        <CalorieTracker totalCalories={totalCalories} />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
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
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;
