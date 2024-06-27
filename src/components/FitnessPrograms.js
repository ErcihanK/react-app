// FitnessPrograms.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Divider } from '@mui/material';
import { GiphyFetch } from '@giphy/js-fetch-api';
import './FitnessPrograms.css';

const workouts = [
  { name: 'Push-Ups', description: '3 sets of 15 reps' },
  { name: 'Squats', description: '3 sets of 20 reps' },
  { name: 'Planks', description: '3 sets of 1 minute' },
  { name: 'Jumping Jacks', description: '3 sets of 50 reps' },
  { name: 'Burpees', description: '3 sets of 10 reps' },
  { name: 'Lunges', description: '3 sets of 15 reps per leg' },
  { name: 'Sit-Ups', description: '3 sets of 20 reps' },
  { name: 'Mountain Climbers', description: '3 sets of 30 seconds' },
  { name: 'High Knees', description: '3 sets of 1 minute' },
  { name: 'Bicep Curls', description: '3 sets of 15 reps' },
];

const getRandomWorkouts = () => {
  const shuffled = workouts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3); // Return 3 random workouts
};

const FitnessPrograms = () => {
  const [randomWorkouts, setRandomWorkouts] = useState([]);
  const [gifUrls, setGifUrls] = useState([]);

  const gf = new GiphyFetch('XmmodvBKmL4iGv9LpMfl8J5N3NDvdqEl'); // Use your Giphy API key

  useEffect(() => {
    const fetchGifs = async () => {
      const selectedWorkouts = getRandomWorkouts();
      setRandomWorkouts(selectedWorkouts);

      const gifs = await Promise.all(
        selectedWorkouts.map(async (workout) => {
          const { data } = await gf.search(`${workout.name} workout`, { limit: 1 });
          return data[0]?.images?.downsized_medium?.url;
        })
      );

      setGifUrls(gifs);
    };

    fetchGifs();
  }, []);

  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h3" gutterBottom className="title">
        Today's Quick Workouts
      </Typography>
      <Paper elevation={3} sx={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
        <List>
          {randomWorkouts.map((workout, index) => (
            <React.Fragment key={index}>
              <ListItem className="workout-item">
                <ListItemText
                  primary={<Typography variant="h6">{workout.name}</Typography>}
                  secondary={<Typography variant="body2">{workout.description}</Typography>}
                />
                {gifUrls[index] && (
                  <Box sx={{ marginLeft: '16px' }}>
                    <img src={gifUrls[index]} alt={workout.name} className="workout-gif" />
                  </Box>
                )}
              </ListItem>
              {index < randomWorkouts.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default FitnessPrograms;
