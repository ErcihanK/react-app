import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const CalorieTracker = ({ totalCalories }) => {
  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Total Calories
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '100px', fontSize: '2rem' }}>
        {totalCalories}
      </Box>
    </Paper>
  );
};

export default CalorieTracker;
