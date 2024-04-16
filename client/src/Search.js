import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user data

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedUser(null); // Reset selected user data when search query changes
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/search?name=${searchQuery}`);
      const sortedResults = response.data.sort((a, b) => a.username.localeCompare(b.username));
      setSearchResults(sortedResults);
      setSelectedUser(null); // Reset selected user data when new search results are fetched
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
    setSelectedUser(null); // Reset selected user data when going back to search results
  };

  const fieldNames = {
    name: "Name",
    id: "ID",
    titleOfPRPTopic: "Title of PRP Topic",
    researchAdvisor: "Research Advisor",
    prpSubmitted: "PRP Submitted",
    fullAuthorList: "Full Author List",
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
            <h2>User Details</h2>
            <p><strong>Name:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Semester:</strong> {selectedUser.semester}</p>
            {selectedUser.formData && (
              <div>
                <h3>Form Data</h3>
                {Object.entries(selectedUser.formData).map(([key, value]) => (
                  <p key={key}><strong>{fieldNames[key] || key}:</strong> {value}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
