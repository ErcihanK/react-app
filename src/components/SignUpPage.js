import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <Authenticator>
      {({ signOut, user }) => {
        if (user) {
          navigate('/dashboard');
          return null;
        }
        return (
          <div>
            <h1>Please sign up</h1>
          </div>
        );
      }}
    </Authenticator>
  );
};

export default SignUpPage;
