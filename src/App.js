import React from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Dashboard from './components/Dashboard';
import FoodEntryForm from './components/FoodEntryForm';
import FoodHistory from './components/FoodHistory';
import CalorieTracker from './components/CalorieTracker';
import './App.css';

Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
      <h1>My Health Tracker</h1>
    
      <Dashboard />
    </div>
  );
}

export default withAuthenticator(App);
