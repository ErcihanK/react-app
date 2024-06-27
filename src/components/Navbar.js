// Navbar.js
import React, { useState } from 'react';
import { Box, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandMore';
import ExpandMore from '@mui/icons-material/ExpandLess';
import SettingsIcon from '@mui/icons-material/Settings';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ForumIcon from '@mui/icons-material/Forum';
import TimelineIcon from '@mui/icons-material/Timeline';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import './Navbar.css';

const services = [
  { name: 'Personalized Diet Plans', icon: <RestaurantMenuIcon />, link: '/dashboard/diet-plans' },
  { name: 'Fitness Programs', icon: <FitnessCenterIcon />, link: '/dashboard/fitness-programs' },
  { name: 'Community Forum', icon: <ForumIcon />, link: '/dashboard/community-forum' },
  { name: 'Progress Tracker', icon: <TimelineIcon />, link: '/dashboard/progress' },
  { name: 'Calorie Tracker', icon: <FastfoodIcon />, link: '/food-entry' }
];

const Navbar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/'); // Redirect to the landing page
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className="drawer"
      classes={{ paper: "drawer-paper" }}
    >
      <div className="drawer-container">
        <Typography variant="h5" className="drawer-title">
          FitGuard
        </Typography>
        <List className="drawer-list">
          <ListItem button onClick={handleClick} className="drawer-list-item">
            <ListItemIcon><MenuIcon /></ListItemIcon>
            <ListItemText primary="Main Menu" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {services.map((service, index) => (
                <ListItem button key={index} component={Link} to={service.link} className={`drawer-list-item ${location.pathname === service.link ? 'active' : ''}`}>
                  <ListItemIcon>{service.icon}</ListItemIcon>
                  <ListItemText primary={service.name} />
                </ListItem>
              ))}
              <ListItem button onClick={handleSignOut} className="drawer-list-item">
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    </Drawer>
  );
};

export default Navbar;
