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


const updateFormData = async (formData) => {
    try {
        user.formData = formData;
    } catch (error) {
        console.error('Error updating user data:', error);
    }
}

  const logout = () => {
    setIsAuthenticated(false); // Set authenticated flag to false
    setUser(null); // Clear user data
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isAuthenticated, user, login, logout, updateFormData}}>
      {children}
    </AuthContext.Provider>
  );
};











// import React, { useState, createContext, useContext, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(localStorage.getItem('token')); // Get the token from localStorage

//     useEffect(() => {
//         const verifyToken = async () => {
//             if (token) {
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//                 try {
//                     // Make sure you have an endpoint to verify the token and get user details
//                     const response = await axios.get('/verify-token');
//                     setIsAuthenticated(true);
//                     setUser(response.data.user); // Set user details obtained from the token
//                     if (response.data.user.option === 'one') {
//                         setIsAdmin(true);
//                     }
//                 } catch (error) {
//                     // If token verification fails, handle accordingly
//                     console.error('Token verification failed:', error);
//                     logout(); // Ensure logout function removes the token and clears state
//                 }
//             }
//         };

//         verifyToken();
//     }, [token]);
//     const login = async (username, password) => {
//         // Replace with your actual login API call
//         const response = await fetch('http://localhost:5000/signin', { username, password });
//         const data = await response.json();

//         if (response.ok) {
//             setToken(data.token);
//             localStorage.setItem('token', data.token); // Store the token in localStorage
            
//             // Set the Authorization header for subsequent requests
//             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//             setIsAuthenticated(true);
//             setUser(data.user); // Assuming the response includes the user
//             if (data.user.option === 'one') setIsAdmin(true);
//             else setIsAdmin(false);
//         } else {
//             // Handle login error
//             setIsAuthenticated(false);
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('token'); // Remove the token from localStorage
//         setToken(null);
//         setIsAuthenticated(false);
//         setIsAdmin(false);
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ isAdmin, isAuthenticated, user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };