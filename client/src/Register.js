import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [option, setOption] = useState('one'); // Default selection
  const [semester, setSemester] = useState('Spring 2024'); // Default value


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const userData = {
      username,
      password,
      email,
      option,
      semester,
      // other fields
    };
  
    try {
      const response = await axios.post('http://localhost:5000/register', userData);
      console.log('User registered:', response.data);
      // Handle success (e.g., navigate to a different page, show a success message)
    } catch (error) {
      console.error('Error registering user:', error.response.data);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
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
        <div>
          <label>Options:</label>
          <div>
            <input type="radio" id="one" name="option" value="one" checked={option === 'one'} onChange={(e) => setOption(e.target.value)} />
            <label htmlFor="one">One</label>
          </div>
          <div>
            <input type="radio" id="two" name="option" value="two" checked={option === 'two'} onChange={(e) => setOption(e.target.value)} />
            <label htmlFor="two">Two</label>
          </div>
          <div>
            <input type="radio" id="three" name="option" value="three" checked={option === 'three'} onChange={(e) => setOption(e.target.value)} />
            <label htmlFor="three">Three</label>
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
      </form>
    </div>
  );
}

export default Register;
