import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminHome.css';
import { useAuth } from './AuthContext';

const AdminHome = () => {
  const [announcementText, setAnnouncementText] = useState('');
  const { isAdmin } = useAuth();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:5000/announcements');
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      // Handle error
    }
  };

  const handleAnnouncementSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/announcement', { message: announcementText });
      setAnnouncementText('');
      fetchAnnouncements();
    } catch (error) {
      console.error('Error making announcement:', error);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/announcement/${id}`);
        if (response.status === 200) {
          alert('Announcement deleted successfully');
          // Refresh the announcements list
          fetchAnnouncements();
        }
      } catch (error) {
        console.error('Error deleting announcement:', error);
        alert('Failed to delete announcement');
      }
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
        fetchAnnouncements();
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
          maxLength="300" // limit to 300 characters
        />
        <ul>
          {announcements.map((announcement) => (
           <li key={announcement._id}>
              {announcement.message}
              <button onClick={() => handleDeleteAnnouncement(announcement._id)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
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
