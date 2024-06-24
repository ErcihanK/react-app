import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import './OutputWidget.css';

const OutputWidget = () => {
  return (
    <Paper className="output-widget" elevation={3}>
      <Typography variant="h6" gutterBottom>
        Output
      </Typography>
      <Box>
        <Typography variant="body2">Boost energy - 125 gm</Typography>
        <Typography variant="body2">Weight loss - 2.5 kg</Typography>
      </Box>
    </Paper>
  );
};

export default OutputWidget;
