import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Navbar from './Navbar';
import Header from './Header';
import FitnessPrograms from './FitnessPrograms';
import CommunityForum from './CommunityForum';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Dashboard.css';

const Dashboard = ({ logAction }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    weight: '75', // Static initial data
    height: '6.5',
    age: '25'
  });

  useEffect(() => {
    if (!user) {
      return;
    }
    
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://nodejs-czjr-production.up.railway.app/user/${user.username}`);
        if (!response.ok) {
          if (response.status === 404) {
            // If user not found, initialize with default static data
            await handleSaveClick(true);
          } else {
            throw new Error('Network response was not ok');
          }
        } else {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async (initial = false) => {
    try {
      const response = await fetch(`https://nodejs-czjr-production.up.railway.app/user/${user.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUserData(data);
      if (!initial) setEditing(false); // Set editing to false only if not initial save
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const goals = [
    { name: 'Running', target: '70km/80km', percentage: 87.5, icon: '🏃' },
    { name: 'Sleeping', target: '50hrs/60hrs', percentage: 83.3, icon: '💤' },
    { name: 'Weight Loss', target: '70kg/100kg', percentage: 70, icon: '🔥' },
  ];

  const monthlyProgress = 80;

  if (!user) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <Box className="dashboard-container">
      <Navbar logAction={logAction} />
      <Box className="main-content">
        <Header />
        <Box className="content">
          <Routes>
            <Route path="fitness-programs" element={<FitnessPrograms />} />
            <Route path="community-forum" element={<CommunityForum />} />
            {/* Add other routes here */}
          </Routes>
        </Box>
      </Box>
      <Box className="side-nav">
        <div className="profile">
          <img src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' alt="Profile" className="profile-image" />
          <h2>{user.username}</h2>
          <p>Sydney, Australia</p>
        </div>

        <div className="stats">
          {editing ? (
            <>
              <TextField
                name="weight"
                label="Weight"
                value={userData.weight}
                onChange={handleChange}
              />
              <TextField
                name="height"
                label="Height"
                value={userData.height}
                onChange={handleChange}
              />
              <TextField
                name="age"
                label="Age"
                value={userData.age}
                onChange={handleChange}
              />
              <Button onClick={() => handleSaveClick(false)}>Save</Button>
            </>
          ) : (
            <>
              <div className="stat-item" onClick={handleEditClick}>
                <span className="stat-value">{userData.weight}</span>
                <span className="stat-label">Weight</span>
              </div>
              <div className="stat-item" onClick={handleEditClick}>
                <span className="stat-value">{userData.height}</span>
                <span className="stat-label">Height</span>
              </div>
              <div className="stat-item" onClick={handleEditClick}>
                <span className="stat-value">{userData.age}</span>
                <span className="stat-label">Age</span>
              </div>
            </>
          )}
        </div>

        <div className="goals">
          <h3>Your Goals</h3>
          {goals.map((goal, index) => (
            <div className="goal-item" key={index}>
              <div className="goal-icon">{goal.icon}</div>
              <div className="goal-info">
                <span className="goal-name">{goal.name}</span>
                <span className="goal-target">{goal.target}</span>
              </div>
              <div className="goal-progress">
                <CircularProgressbar
                  value={goal.percentage}
                  text={`${goal.percentage}%`}
                  styles={buildStyles({
                    pathColor: goal.percentage >= 80 ? '#00B8D9' : goal.percentage >= 60 ? '#FF5630' : '#6554C0',
                    textColor: '#333',
                    trailColor: '#E0E0E0',
                    backgroundColor: '#fff',
                  })}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="monthly-progress">
          <h3>Monthly Progress</h3>
          <div className="progress-circle">
            <CircularProgressbar
              value={monthlyProgress}
              text={`${monthlyProgress}%`}
              styles={buildStyles({
                pathColor: '#FF5630',
                textColor: '#333',
                trailColor: '#E0E0E0',
                backgroundColor: '#fff',
              })}
            />
          </div>
          <p>You have achieved {monthlyProgress}% of your goal this month</p>
        </div>

        <div className="scheduled">
          <h3>Scheduled</h3>
          <div className="schedule-item">
            <div className="schedule-icon">🧘</div>
            <div className="schedule-info">
              <span className="schedule-name">Training - Yoga Class</span>
              <span className="schedule-category">Fitness</span>
            </div>
            <span className="schedule-date">22 Mar</span>
          </div>
          <div className="schedule-item">
            <div className="schedule-icon">🏊</div>
            <div className="schedule-info">
              <span className="schedule-name">Training - Swimming</span>
              <span className="schedule-category">Fitness</span>
            </div>
            <span className="schedule-date">22 Mar</span>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
