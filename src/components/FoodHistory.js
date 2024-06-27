import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FoodHistory = ({ foodEntries, deleteFoodEntry }) => {
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
            <ListItemText primary={`${entry.foodItem} - ${entry.calories} calories`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FoodHistory;
