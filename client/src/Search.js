import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/search?name=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error occurred during search:', error);
    }
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
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results</h3>
          <ul>
            {/* Map through searchResults and display each username */}
            {searchResults.map((user) => (
              <li key={user._id}>{user.username}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
