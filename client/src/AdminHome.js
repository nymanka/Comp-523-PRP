import React from 'react';
import './AdminHome.css'; // Ensure your CSS file is imported

const AdminHome = () => {
  return (
    <div className="home-container">
      <div className="notifications-container">
        <h2>Announcements</h2>
        {/* Notification list goes here */}
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
