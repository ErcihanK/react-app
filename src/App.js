import React from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import FoodEntryForm from './components/FoodEntryForm';
import CommunityForum from './components/CommunityForum';
import ThreadDetail from './components/ThreadDetail';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';

Amplify.configure(awsExports);

const App = () => {
  const AuthenticatedDashboard = withAuthenticator(Dashboard);
  const AuthenticatedFoodEntryForm = withAuthenticator(FoodEntryForm);
  const AuthenticatedThreadDetail = withAuthenticator(ThreadDetail);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard/*" element={<AuthenticatedDashboard />} />
        <Route path="/food-entry" element={<AuthenticatedFoodEntryForm />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/community-forum" element={<CommunityForum />} />
        <Route path="/threads/:id" element={<AuthenticatedThreadDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
