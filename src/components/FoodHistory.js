// FoodHistory.js
import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, IconButton, ListItemAvatar, Avatar, Divider, Box, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import './FoodHistory.css';

const FoodHistory = ({ foodEntries, deleteFoodEntry }) => {
  const [foodImages, setFoodImages] = useState({});

  useEffect(() => {
    const fetchFoodImages = async () => {
      const newFoodImages = {};
      for (const entry of foodEntries) {
        if (!foodImages[entry.foodItem]) {
          try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${entry.foodItem}`);
            if (response.data.meals) {
              newFoodImages[entry.foodItem] = response.data.meals[0].strMealThumb;
            } else {
              newFoodImages[entry.foodItem] = null;
            }
          } catch (error) {
            console.error('Error fetching food image:', error);
            newFoodImages[entry.foodItem] = null;
          }
        }
      }
      setFoodImages((prevImages) => ({ ...prevImages, ...newFoodImages }));
    };

    fetchFoodImages();
  }, [foodEntries]);

  const totalCalories = foodEntries.reduce((total, entry) => total + parseInt(entry.calories), 0);

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Food History
      </Typography>
      <List>
        {foodEntries.map((entry, index) => (
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => deleteFoodEntry(entry.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemAvatar>
              <Avatar src={foodImages[entry.foodItem]} alt={entry.foodItem} />
            </ListItemAvatar>
            <ListItemText primary={`${entry.foodItem} - ${entry.calories} calories`} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box className="circular-progress-wrapper">
        <Box className="circular-progress-container">
          <CircularProgress variant="determinate" value={100} size={120} thickness={4} className="circular-progress" />
          <Box className="circular-progress-content">
            <Typography variant="caption" component="div">
              MY DAILY
            </Typography>
            <Typography variant="h6" component="div">
              {totalCalories}
            </Typography>
            <Typography variant="subtitle1" component="div">
              kCal
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default FoodHistory;
