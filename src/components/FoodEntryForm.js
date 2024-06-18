import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import { createFoodEntry } from '../graphql/mutations';

const client = generateClient();

const FoodEntryForm = () => {
  const [food, setFood] = useState('');      
  const [calories, setCalories] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await Amplify.currentAuthenticatedUser();
    const userId = user.username;
    const date = new Date().toISOString();

    try {
      await client.graphql({
        query: createFoodEntry,
        variables: { input: { food, calories: parseInt(calories), userId, date } },
      });
      setFood('');
      setCalories('');
    } catch (error) {
      console.error('Error creating food entry:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={food}
        onChange={(e) => setFood(e.target.value)}
        placeholder="Food"
        required
      />
      <input
        type="number"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        placeholder="Calories"
        required
      />
      <button type="submit">Add Food</button>
    </form>
  );
};

export default FoodEntryForm;
