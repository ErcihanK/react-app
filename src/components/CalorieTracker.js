import React from 'react';
import { Paper, Typography } from '@mui/material';

const CalorieTracker = ({ totalCalories }) => {
  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Total Calories
      </Typography>
      <Typography variant="h4">{totalCalories}</Typography>
    </Paper>
  );
};

export default CalorieTracker;
