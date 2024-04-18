import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // Adjust the path as necessary
import  './Profile.css';
import axios from 'axios';

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useAuth(); // Use the user data from AuthContext

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

const handleFileUpload = () => {
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append('pdfFile', selectedFile);
  formData.append('userId', user.id); // Adjust according to where user id is stored

  axios.post('http://localhost:5000/uploadPdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => {
    console.log('File uploaded successfully:', response.data);
  })
  .catch(error => {
    console.error('Upload error:', error);
  });
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
