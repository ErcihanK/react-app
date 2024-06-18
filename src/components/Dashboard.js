import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import { listFoodEntries, listWeightEntries } from '../graphql/queries';

const client = generateClient();

const Dashboard = () => {
  const [foodEntries, setFoodEntries] = useState([]);
  const [weightEntries, setWeightEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const user = await Amplify.Auth.currentAuthenticatedUser();
      const userId = user.username;

      const foodData = await client.graphql({
        query: listFoodEntries,
        variables: { filter: { userId: { eq: userId } } },
      });

      const weightData = await client.graphql({
        query: listWeightEntries,
        variables: { filter: { userId: { eq: userId } } },
      });

      setFoodEntries(foodData.data.listFoodEntries.items);
      setWeightEntries(weightData.data.listWeightEntries.items);
    };

    fetchEntries();
  }, []);   

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Food Entries</h2>
      <ul>
        {foodEntries.map((entry) => (
          <li key={entry.id}>
            {entry.food} - {entry.calories} calories on {new Date(entry.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
      <h2>Weight Entries</h2>
      <ul>
        {weightEntries.map((entry) => (
          <li key={entry.id}>
            {entry.weight} kg on {new Date(entry.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
