import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [editedFormData, setEditedFormData] = useState(null);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedUser(null); 
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/search?name=${searchQuery}`);
      const sortedResults = response.data.sort((a, b) => a.username.localeCompare(b.username));
      setSearchResults(sortedResults);
      setSelectedUser(null); 
    } catch (error) {
      console.error('Error occurred during search:', error);
    }
  };

  const handleUserClick = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/userData?userId=${userId}`);
      setSelectedUser(response.data);
      setIsEditing(false); // Reset edit mode when selecting a new user
      setEditedFormData(null); // Reset edited form data
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setEditedFormData(null); // Reset edited form data when toggling edit mode
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
    presentationScope: "Presentation Scope",
    listenWaiver: "Who Listened to Waiver Talk (If Applicable)"
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setEditedFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmitEdits = async () => {
    try {
      await axios.post('http://localhost:5000/saveFormData', { userId: selectedUser._id, formData: editedFormData });
      setSelectedUser((prevUser) => ({
        ...prevUser,
        formData: editedFormData,
      }));
      setIsEditing(false); // Exit edit mode after submitting edits
      console.log('Edits submitted successfully');
    } catch (error) {
      console.error('Error submitting edits:', error);
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
            <button className="back-button" onClick={() => setSelectedUser(null)}>
              &#8592; Back to Results
            </button>
            <h2>User Details</h2>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Semester:</strong> {selectedUser.semester}</p>
            <p><strong>Waiver:</strong> {selectedUser.waive}</p>
            {isEditing && selectedUser.formData && (
              <div>
                <h3>Edit Form Data</h3>
                {Object.entries(selectedUser.formData).map(([key, value]) => (
                <><p><strong>{fieldNames[key] || key}:</strong></p>  
                <input
                    key={key}
                    type="text"
                    name={key}
                    value={editedFormData?.[key] ?? value}
                    onChange={handleFieldChange}
                    className="edit-input"
                  />
                  </>
                ))}
              </div>
            )}
            {!isEditing && selectedUser.formData && (
              <div>
                <h3>Form Data</h3>
                {Object.entries(selectedUser.formData).map(([key, value]) => (
                  <p key={key}><strong>{fieldNames[key] || key}:</strong> {value}</p>
                ))}
              </div>
            )}
            <button onClick={toggleEditMode}>{isEditing ? 'Submit' : 'Edit'}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
