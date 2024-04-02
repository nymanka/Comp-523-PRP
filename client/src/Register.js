import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS here

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [waive, setWaive] = useState('no'); // Default selection
  const [semester, setSemester] = useState('Spring 2024'); // Default value
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();



  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const userData = {
      username,
      password,
      email,
      waive,
      semester,
      // other fields
    };
  
    try {
      const response = await axios.post('http://localhost:5000/register', userData);
      console.log('User registered:', response.data);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data); // Display error message from server
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='register-container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Request Waiver:</label>
          <div className="form-radio-group"> {/* This div groups the radio buttons */}
            <input type="radio" id="one" name="waive" value="yes" checked={waive === 'yes'} onChange={(e) => setWaive(e.target.value)} />
            <label htmlFor="one">Yes</label>
            
            <input type="radio" id="two" name="waive" value="no" checked={waive === 'no'} onChange={(e) => setWaive(e.target.value)} />
            <label htmlFor="two">No</label>

            <input type="radio" id="three" name="waive" value="admin" checked={waive === 'admin'} onChange={(e) => setWaive(e.target.value)} />
            <label htmlFor="three">admin</label>
          </div>
        </div>
        <div>
          <label htmlFor="semester">Semester:</label>
          <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="Spring 2024">Spring 2024</option>
            <option value="Fall 2024">Fall 2024</option>
            <option value="Spring 2025">Spring 2025</option>
            {/* Add more semesters as needed */}
          </select>
        </div>
        <button type="submit">Register</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default Register;