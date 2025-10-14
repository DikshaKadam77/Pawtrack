// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User is null when logged out

  // This login function will be called from your LoginPage
  const login = (userData) => {
    setUser(userData);
  };

  // This logout function will be called from the Header
  const logout = () => {
    setUser(null);
  };

  // The value provided to the rest of your app
  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// A custom hook to make it easy to use the auth context in other components
export const useAuth = () => {
  return useContext(AuthContext);
};