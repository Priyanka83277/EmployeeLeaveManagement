// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the Auth context
const AuthContext = createContext();

// This is the provider component
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // Set the logged-in user data
  };

  const logout = () => {
    setUser(null); // Clear the user data on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export both the context and the provider
export { AuthContext, AuthContextProvider };  // Make sure to export AuthContextProvider
