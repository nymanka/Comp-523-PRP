import React, { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true); // Set authenticated flag to true
    setUser(userData); // Store user data
    if (userData.option === 'one') setIsAdmin(true); // Set admin flag to true
    else setIsAdmin(false); // Set admin flag to false
  };

  const logout = () => {
    setIsAuthenticated(false); // Set authenticated flag to false
    setUser(null); // Clear user data
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
