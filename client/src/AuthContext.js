import React, { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true); // Set authenticated flag to true
    setUser(userData); // Store user data
  };

  const logout = () => {
    setIsAuthenticated(false); // Set authenticated flag to false
    setUser(null); // Clear user data
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
