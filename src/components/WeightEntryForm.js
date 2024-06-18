import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import { createWeightEntry } from '../graphql/mutations';

const client = generateClient();

const WeightEntryForm = () => {
  const [weight, setWeight] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const user = await Amplify.currentAuthenticatedUser();
    const userId = user.username;
    const date = new Date().toISOString();

    try {
      await client.graphql({
        query: createWeightEntry,
        variables: { input: { weight: parseFloat(weight), userId, date } },
      });
      setWeight('');
    } catch (error) {
      console.error('Error creating weight entry:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Weight"
        required
      />
      <button type="submit">Add Weight</button>
    </form>
  );
};

export default WeightEntryForm;
