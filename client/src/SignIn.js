import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    try {
      // Replace URL with your actual backend endpoint
      const response = await axios.post('http://localhost:5000/signin', { username, password });
      console.log(response.data);
      // TODO: Handle login success
      navigate('/home');
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
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        
      </form>
      {/* Registration link */}
    </div>
  );
}

export default SignIn;
