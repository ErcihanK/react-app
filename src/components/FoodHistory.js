import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const FoodHistory = ({ foodEntries }) => {
  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Food History
      </Typography>
      <List>
        {foodEntries.map((entry, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${entry.foodItem} - ${entry.calories} calories`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FoodHistory;
