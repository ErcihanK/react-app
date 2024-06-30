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
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import AWS from 'aws-sdk';

// Configure Amplify
Amplify.configure(awsExports);

// Configure AWS SDK for CloudWatch
AWS.config.update({
  region: awsExports.aws_project_region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsExports.aws_cognito_identity_pool_id,
  }),
});

const cloudwatchlogs = new AWS.CloudWatchLogs();

// Function to log user actions
const logUserAction = async (action) => {
  const params = {
    logGroupName: 'AmplifyReactWebsiteLogs', // The log group name
    logStreamName: 'UserActions', // You can make this dynamic based on the user or session
    logEvents: [
      {
        message: JSON.stringify(action),
        timestamp: new Date().getTime(),
      },
    ],
  };

  try {
    await cloudwatchlogs.putLogEvents(params).promise();
  } catch (err) {
    console.error('Error logging user action: ', err);
  }
};

const App = () => {
  return (
    <Authenticator.Provider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/*" element={<Dashboard logAction={logUserAction} />} />
          <Route path="/food-entry" element={<FoodEntryForm logAction={logUserAction} />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/community-forum" element={<CommunityForum logAction={logUserAction} />} />
          <Route path="/threads/:id" element={<ThreadDetail logAction={logUserAction} />} />
        </Routes>
      </Router>
    </Authenticator.Provider>
  );
};

export default App;
