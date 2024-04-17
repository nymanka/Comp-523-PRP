import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedUser(null);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/search?name=${searchQuery}`);
      setSearchResults(response.data.sort((a, b) => a.username.localeCompare(b.username)));
      setSelectedUser(null);
    } catch (error) {
      console.error('Error occurred during search:', error);
    }
  };

  const handleUserClick = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/userData?userId=${userId}`);
      setSelectedUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleBackToResults = () => {
    setSelectedUser(null);
  };

  

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/resetPassword', {
        selectedUserId: selectedUser.username,
        password: newPassword
      });
      alert('Password reset successfully!');
      setNewPassword('');
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password.');
    }
  };

  const fieldNames = {
    name: "Name",
    id: "ID",
    titleOfPRPTopic: "Title of PRP Topic",
    researchAdvisor: "Research Advisor",
    prpSubmitted: "PRP Submitted",
    nameOfJournal: "Name of Conference/Journal",
    paperAccepted: "Paper Accepted",
    reviewsAvailable: "Reviews Available",
    partResponsibleFor: "Part Responsible For",
    presentationScope: "Presentation Scope"
  };

  return (
    <div className="search-container">
  <h2>Student Search</h2>
  <form onSubmit={handleSearchSubmit} className="search-form">
    <input
      type="text"
      placeholder="Search by name..."
      value={searchQuery}
      onChange={handleSearchInputChange}
      className="search-input"
    />
    <button type="submit" className="search-button">Search</button>
  </form>
  {(searchResults.length > 0 && !selectedUser) && (
    <div className="search-results">
      <h3>Search Results</h3>
      <ul>
        {searchResults.map((user) => (
          <li key={user._id} onClick={() => handleUserClick(user._id)}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  )}
  {selectedUser && (
    <div className="user-modal">
      <div className="modal-content">
        <button className="back-button" onClick={handleBackToResults}>
          &#8592; Back to Results
        </button>
        <div className="user-details">
          <h3>User Details</h3>
          <p><strong>Username:</strong> {selectedUser.username}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Semester:</strong> {selectedUser.semester}</p>
        </div>
        {selectedUser.formData && (
          <div className="form-data">
            <h3>Form Data</h3>
            {Object.entries(selectedUser.formData).map(([key, value]) => (
              <p key={key}><strong>{fieldNames[key] || key}:</strong> {value}</p>
            ))}
          </div>
        )}
        <div className="password-reset">
          <h2>Reset Password</h2>
          <form onSubmit={handlePasswordReset}>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  )}
</div>

  );
}

export default Search;
