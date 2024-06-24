import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import './ScheduledWidget.css';

const ScheduledWidget = () => {
  return (
    <Paper className="scheduled-widget" elevation={3}>
      <Typography variant="h6" gutterBottom>
        Scheduled
      </Typography>
      <Box>
        <Typography variant="body2">Training Yoga Class - 22 Apr</Typography>
        <Typography variant="body2">Training Swimming - 28 Apr</Typography>
      </Box>
    </Paper>
  );
};

export default ScheduledWidget;
