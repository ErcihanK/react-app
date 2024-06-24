import React from 'react';
import { Paper, Typography, Avatar } from '@mui/material';
import './ProfileSection.css';

const ProfileSection = ({ name, weight, height, age, profilePicture }) => {
  return (
    <Paper className="profile-section" elevation={3}>
      <Avatar src={profilePicture} alt={name} className="profile-picture" />
      <Typography variant="h6" className="profile-name">{name}</Typography>
      <Typography variant="body2">Weight: {weight} kg</Typography>
      <Typography variant="body2">Height: {height} cm</Typography>
      <Typography variant="body2">Age: {age}</Typography>
    </Paper>
  );
};

export default ProfileSection;
