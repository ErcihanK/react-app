import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Button, Alert } from '@mui/material';
import FoodEntryForm from './FoodEntryForm';
import CalorieTracker from './CalorieTracker';
import FoodHistory from './FoodHistory';
import { signOut } from 'aws-amplify/auth';
import { fetchUsers } from '../api';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

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
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        setError('There was an error fetching the data!');
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      <Paper className="dashboard-container" elevation={3}>
        <Typography variant="h4" gutterBottom>
          Calorie Tracker Dashboard
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FoodEntryForm addFoodEntry={addFoodEntry} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CalorieTracker totalCalories={totalCalories} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FoodHistory foodEntries={foodEntries} />
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography variant="h6">Users List</Typography>
              <ul>
                {users.map((user, index) => (
                  <li key={index}>{user.name}</li>
                ))}
              </ul>
            </Box>
          </Grid>
        </Grid>
        <div className="button-container">
          <Button variant="contained" color="secondary" className="sign-out-button" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Dashboard;
