import React from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import Dashboard from './components/Dashboard';
import FoodEntryForm from './components/FoodEntryForm';
import WeightEntryForm from './components/WeightEntryForm';
import './App.css';

Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
      <h1>My Health Tracker</h1>
      <FoodEntryForm />
      <WeightEntryForm />
      <Dashboard />
    </div>
  );
}

export default withAuthenticator(App);
