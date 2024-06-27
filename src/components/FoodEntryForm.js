import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Paper, Typography, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ForumIcon from '@mui/icons-material/Forum';
import TimelineIcon from '@mui/icons-material/Timeline';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FoodHistory from './FoodHistory';

const services = [
  { name: 'Personalized Diet Plans', icon: <RestaurantMenuIcon />, link: '/dashboard/diet-plans' },
  { name: 'Fitness Programs', icon: <FitnessCenterIcon />, link: '/dashboard/fitness-programs' },
  { name: 'Community Forum', icon: <ForumIcon />, link: '/dashboard/community' },
  { name: 'Progress Tracker', icon: <TimelineIcon />, link: '/dashboard/progress' },
  { name: 'Calorie Tracker', icon: <FastfoodIcon />, link: '/dashboard/food-entry' }
];

const FoodEntryForm = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthenticator((context) => [context.user]);
  const [foodEntries, setFoodEntries] = useState([]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

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
        }),
      });
      if (response.ok) {
        setFoodEntries([...foodEntries, { id: `food:${Date.now()}`, foodItem: values.foodItem, calories: values.calories }]);
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
        setFoodEntries(foodEntries.filter(entry => entry.id !== id));
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
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <Typography variant="h5" sx={{ p: 2 }}>
            FitGuard
          </Typography>
          <List>
            <ListItem button onClick={handleClick}>
              <ListItemIcon><MenuIcon /></ListItemIcon>
              <ListItemText primary="Main Menu" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {services.map((service, index) => (
                  <ListItem button key={index} component={Link} to={service.link} selected={location.pathname === service.link}>
                    <ListItemIcon>{service.icon}</ListItemIcon>
                    <ListItemText primary={service.name} />
                  </ListItem>
                ))}
                <ListItem button onClick={handleSignOut}>
                  <ListItemIcon><SettingsIcon /></ListItemIcon>
                  <ListItemText primary="Sign Out" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
