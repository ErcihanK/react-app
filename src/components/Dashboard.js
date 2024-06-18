import React, { useState } from 'react';
import FoodEntryForm from './FoodEntryForm';
import CalorieTracker from './CalorieTracker';
import FoodHistory from './FoodHistory';
import { signOut } from 'aws-amplify/auth';

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
    <div>
      <h1>Calorie Tracker Dashboard</h1>
      <FoodEntryForm addFoodEntry={addFoodEntry} />
      <CalorieTracker totalCalories={totalCalories} />
      <FoodHistory foodEntries={foodEntries} />
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Dashboard;
