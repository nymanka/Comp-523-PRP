import React, { useState } from 'react';

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Dummy user data - replace with actual data as needed
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    // other user details
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      // Implement the logic to handle the file upload
      console.log('Uploading', selectedFile.name);
      // You would typically send this file to your server here
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <h2>User Information</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {/* Display other user information here */}
      </div>

      <div>
        <h2>Upload PDF</h2>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
    </div>
  );
};

export default Profile;
