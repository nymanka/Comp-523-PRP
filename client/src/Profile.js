import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // Adjust the path as necessary
import  './Profile.css';

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useAuth(); // Use the user data from AuthContext

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      console.log('Uploading', selectedFile.name);
      // Implement file upload logic here
    }
  };

  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile Page</h1>
      </div>
      <div className="user-info">
        <h2>User Information</h2>
        <p>Name: {user.username}</p>
        <p>Email: {user.email}</p>
        {/* Additional user details */}
      </div>

      <div className="file-upload-container">
        <h2>Upload PDF</h2>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
    </div>
  );
};

export default Profile;
