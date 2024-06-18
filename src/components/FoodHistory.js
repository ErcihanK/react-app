import React from 'react';

const FoodHistory = ({ foodEntries }) => {
  return (
    <div>
      <h2>Food History</h2>
      <ul>
        {foodEntries.map((entry, index) => (
          <li key={index}>
            {entry.foodItem} - {entry.calories} calories
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodHistory;
