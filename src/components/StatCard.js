import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import './StatCard.css';

const StatCard = ({ icon, value, label }) => {
  return (
    <Paper className="stat-card" elevation={3}>
      <Box display="flex" flexDirection="column" alignItems="center" p={2}>
        {icon}
        <Typography variant="h4">{value}</Typography>
        <Typography variant="subtitle1">{label}</Typography>
      </Box>
    </Paper>
  );
};

export default StatCard;
