import React, { useState } from 'react';

const FoodEntryForm = ({ addFoodEntry }) => {
  const [foodItem, setFoodItem] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addFoodEntry({ foodItem, calories: Number(calories) });
    setFoodItem('');
    setCalories('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Food Item"
        value={foodItem}
        onChange={(e) => setFoodItem(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default FoodEntryForm;
