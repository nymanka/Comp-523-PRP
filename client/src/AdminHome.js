import React, { useState } from 'react';
import axios from 'axios';
import './AdminHome.css'; // Ensure your CSS file is imported

const AdminHome = () => {
  const [announcementText, setAnnouncementText] = useState('');

  const handleAnnouncementSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/announcement', { message: announcementText });
      // Optionally, you can clear the input field after successful submission
      setAnnouncementText('');
      // You can also fetch the updated list of announcements and display them here
    } catch (error) {
      console.error('Error making announcement:', error);
      // Handle error
    }
  };

  const handleAnnouncementChange = (event) => {
    setAnnouncementText(event.target.value);
  };

  return (
    <div className="home-container">
      <div className="notifications-container">
        <h2>Announcements</h2>
        {<div className="announcement-input-container">
        <textarea
          value={announcementText}
          onChange={handleAnnouncementChange}
          placeholder="Enter your announcement..."
          className="announcement-input"
        />
        <button onClick={handleAnnouncementSubmit} className="announcement-submit-button">Make Announcement</button>
      </div>}
        {/* You can fetch and display the announcements here */}
      </div>
      
      <div className="calendar-container">
        <iframe 
          src="https://calendar.google.com/calendar/embed?src=shadowkaan08%40gmail.com&ctz=America%2FNew_York" 
          style={{ border: 0 }} 
          width="800" 
          height="600" 
          frameBorder="0" 
          scrolling="no"
          title="Google Calendar">
        </iframe>
      </div>
    </div>
  );
};

export default AdminHome;
