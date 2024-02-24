import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Home.css'; // Import the CSS here

const Home = () => {
  return (
    <div className="home-container">
      <div className="notifications-container">
        <h2>Notifications</h2>
        {/* Notification list goes here */}
      </div>
      <div className="calendar-container">
        <Calendar /> {/* Render Calendar */}
      </div>
    </div>
  );
};

export default Home;
