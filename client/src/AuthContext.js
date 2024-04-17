import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
        const token = localStorage.getItem('localToken');
        const loggedInUserId = localStorage.getItem("id");
        if (token && loggedInUserId) {
            setIsAuthenticated(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            

            try {
                const response = await axios.get('http://localhost:5000/userData', { params: { userId: loggedInUserId } });
                if (response.data.waive === 'admin') setIsAdmin(true); // Set admin flag to true
                else setIsAdmin(false); // Set admin flag to false
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error (e.g., clear local storage, reset auth state)
            }
        }
    };

    fetchUserData();
}, []);

  const login = (userData) => {
    setIsAuthenticated(true); // Set authenticated flag to true
    setUser(userData); // Store user data
    if (userData.waive === 'admin') setIsAdmin(true); // Set admin flag to true
    else setIsAdmin(false); // Set admin flag to false
  };


const updateFormData = async (formData) => {
    try {
        user.formData = formData;
    } catch (error) {
        console.error('Error updating user data:', error);
    }
}

const updateWaiveOption = async (waiveOption) => {
    try {
        user.waive = waiveOption;
    } catch (error) {
        console.error('Error updating user waive option:', error);
    }
}

  const logout = () => {
    setIsAuthenticated(false); // Set authenticated flag to false
    setIsAdmin(false); // Set admin flag to false
    setUser(null); // Clear user data
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isAuthenticated, user, login, logout, updateFormData, updateWaiveOption}}>
      {children}
    </AuthContext.Provider>
  );
};
