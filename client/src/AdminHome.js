import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AdminHome.css'; // Import the CSS here

const AdminHome = () => {
  return (
    <div className="home-container">
      <div className="notifications-container">
        <h2>Admin Notifications</h2>
        {/* Notification list goes here */}
      </div>
      <div className="calendar-container">
        <Calendar /> {/* Render Calendar */}
      </div>
    </div>
  );
};

export default AdminHome;
