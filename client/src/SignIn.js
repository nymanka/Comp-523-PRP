import './SignIn.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';




function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    try {
      // Replace URL with your actual backend endpoint
      const response = await axios.post('http://localhost:5000/signin', { username, password });
      // Handle login success by logging in info and putting info into local Storage
      login(response.data);
      localStorage.setItem("localToken", JSON.stringify(response.data));
      localStorage.setItem("id", response.data.id);
      
      //************************************* */
      if (response.data.option === 'one') {
        navigate('/admin-home');
      }
      else navigate('/home');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized
        setErrorMessage('username does not exist or password is incorrect.');
      } else {
        // Handle other errors
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="sign-in-container"> {/* Use container class for overall styling */}
      <div className="form-container"> {/* Use form container class for the form area */}
        <h2>Sign In</h2>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <form onSubmit={handleSubmit} className="sign-in-form"> {/* Add a class if specific form styling is needed */}
          <div className="form-group">
            <label className="form-label">Username:</label>
            <input type="text" className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password:</label>
            <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="form-button">Sign In</button>
          <p className="link-text">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;