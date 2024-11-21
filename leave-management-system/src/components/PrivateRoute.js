import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Get the current authenticated user from context

  // If the user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/" />;
  }

  return children; // Render the protected children if the user is authenticated
};

export default PrivateRoute;
