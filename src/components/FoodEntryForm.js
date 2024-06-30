import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';
import FoodHistory from './FoodHistory';
import Navbar from './Navbar';
import './FoodEntryForm.css'; // Import CSS for custom styling

const FoodEntryForm = () => {
  const navigate = useNavigate();
  const { user } = useAuthenticator((context) => [context.user]);
  const [foodEntries, setFoodEntries] = useState([]);

  const addFoodEntry = async (values) => {
    try {
      const response = await fetch('https://nodejs-czjr-production.up.railway.app/food-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: user?.username || 'Anonymous',
          foodItem: values.foodItem,
          calories: values.calories,
          timestamp: new Date().toISOString(), // Add timestamp here
        }),
      });
      if (response.ok) {
        const newEntry = await response.json();
        setFoodEntries([...foodEntries, newEntry]); // Update state immediately
      } else {
        console.error('Failed to submit food entry');
      }
    } catch (error) {
      console.error('Error submitting food entry:', error);
    }
  };

  const deleteFoodEntry = async (id) => {
    try {
      const response = await fetch(`https://nodejs-czjr-production.up.railway.app/food-entry/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFoodEntries(foodEntries.filter(entry => entry.id !== id)); // Update state immediately
      } else {
        console.error('Failed to delete food entry');
      }
    } catch (error) {
      console.error('Error deleting food entry:', error);
    }
  };

  useEffect(() => {
    const fetchFoodEntries = async () => {
      try {
        const response = await fetch('https://nodejs-czjr-production.up.railway.app/food-entries');
        const data = await response.json();
        const userEntries = data.filter(entry => entry.userName === user.username);
        setFoodEntries(userEntries);
      } catch (error) {
        console.error('Error fetching food entries:', error);
      }
    };

    fetchFoodEntries();
  }, [user]);

  const formik = useFormik({
    initialValues: {
      foodItem: '',
      calories: '',
    },
    validationSchema: Yup.object({
      foodItem: Yup.string().required('Required'),
      calories: Yup.number().required('Required').positive('Must be positive'),
    }),
    onSubmit: (values, { resetForm }) => {
      addFoodEntry(values);
      resetForm();
    },
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: '240px' }}>
        <Paper elevation={3} sx={{ padding: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Add Food Entry
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                id="foodItem"
                name="foodItem"
                label="Food Item"
                value={formik.values.foodItem}
                onChange={formik.handleChange}
                error={formik.touched.foodItem && Boolean(formik.errors.foodItem)}
                helperText={formik.touched.foodItem && formik.errors.foodItem}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                id="calories"
                name="calories"
                label="Calories"
                type="number"
                value={formik.values.calories}
                onChange={formik.handleChange}
                error={formik.touched.calories && Boolean(formik.errors.calories)}
                helperText={formik.touched.calories && formik.errors.calories}
              />
            </Box>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Add Entry
            </Button>
          </form>
        </Paper>
        <Box mt={4}>
          <FoodHistory foodEntries={foodEntries} deleteFoodEntry={deleteFoodEntry} />
        </Box>
      </Box>
    </Box>
  );
};

export default FoodEntryForm;
