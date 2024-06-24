import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import './PopularTrainers.css';

const trainers = [
  { name: 'Jack Aranda', specialty: 'Gym Expert', image: 'trainer1.jpg' },
  { name: 'Olive Yew', specialty: 'Yoga Expert', image: 'trainer2.jpg' },
];

const PopularTrainers = () => {
  return (
    <Paper elevation={3} className="popular-trainers">
      <Typography variant="h6" gutterBottom>
        Popular Trainers
      </Typography>
      <Grid container spacing={2}>
        {trainers.map((trainer, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper className="trainer-card" elevation={1}>
              <img src={trainer.image} alt={trainer.name} className="trainer-image" />
              <Typography variant="h6">{trainer.name}</Typography>
              <Typography variant="body2">{trainer.specialty}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default PopularTrainers;
