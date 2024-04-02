import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Schedule.css';

function Schedule() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users?waive=no');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (userId) => {
    const user = users.find(u => u.id === userId);
    setSelectedUser(user);
  };

  return (
    <div className="schedule-container">
      <h2>Select a User</h2>
      <div className="dropdown-container">
        <select onChange={(e) => handleUserSelect(e.target.value)} defaultValue="">
          <option value="" disabled>Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
      </div>
      {selectedUser && (
        <div className="user-details">
          <h3>User Details</h3>
          <p><strong>Name:</strong> {selectedUser.username}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          {/* Display additional user details as needed */}
        </div>
      )}
    </div>
  );
}

export default Schedule;
