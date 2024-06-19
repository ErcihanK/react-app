import React, { useState } from 'react';
import FoodEntryForm from './FoodEntryForm';
import CalorieTracker from './CalorieTracker';
import FoodHistory from './FoodHistory';
import { signOut } from 'aws-amplify/auth';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [foodEntries, setFoodEntries] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const addFoodEntry = (entry) => {
    setFoodEntries([...foodEntries, entry]);
    setTotalCalories(totalCalories + entry.calories);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Calorie Tracker Dashboard</h1>
      <div className="form-container">
        <FoodEntryForm addFoodEntry={addFoodEntry} />
      </div>
      <div className="calorie-tracker">
        <CalorieTracker totalCalories={totalCalories} />
      </div>
      <div className="food-history">
        <FoodHistory foodEntries={foodEntries} />
      </div>
      <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Dashboard;
