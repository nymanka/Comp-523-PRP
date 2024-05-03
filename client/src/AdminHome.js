import React, { useState } from 'react';
import axios from 'axios';
import './AdminHome.css';
import { useAuth } from './AuthContext';

const AdminHome = () => {
  const [announcementText, setAnnouncementText] = useState('');
  const { isAdmin } = useAuth();

  const handleAnnouncementSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/announcement', { message: announcementText });
      setAnnouncementText('');
    } catch (error) {
      console.error('Error making announcement:', error);
    }
  };

  const handleAnnouncementChange = (event) => {
    setAnnouncementText(event.target.value);
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset the semester? This action cannot be undone.')) {
      try {
        await axios.post('http://localhost:5000/admin/reset');
        alert('Reset successful');
      } catch (error) {
        console.error('Error during reset:', error);
        alert('Reset failed');
      }
    }
  };

  return (
    <div className="home-container">
      <div className="top-section"> 
      <div className="notifications-container">
        <h2>Announcements</h2>
        <textarea
          value={announcementText}
          onChange={handleAnnouncementChange}
          placeholder="Enter your announcement..."
          className="announcement-input"
        />
        <button onClick={handleAnnouncementSubmit} className="announcement-submit-button">Make Announcement</button>
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

      {/* Reset Section */}
      {isAdmin && (
        <div className="reset-section">
          <h2>Reset Semester</h2>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
