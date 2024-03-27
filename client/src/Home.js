import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'; // Ensure your CSS file is imported

const Home = () => {
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

  return (
    <div className="home-container">
      <div className="notifications-container">
        <h2>Notifications/Announcements</h2>
        <ul>
          {announcements.map((announcement) => (
            <li key={announcement._id}>{announcement.message}</li>
          ))}
        </ul>
        <h2>Checklist</h2>
        <ul>{
            <><li>Your paper has been received.</li>
            <li>Your talk has not been scheduled.</li></>
        }
        </ul>
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

export default Home;
