import React from 'react';
import Calendar from 'react-calendar'; // Import only if you're using react-calendar
import 'react-calendar/dist/Calendar.css'; // Default styling

const Home = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h2>Notifications</h2>
        {/* Notification list goes here */}
      </div>
      <div>
        <Calendar /> {/* Render Calendar */}
      </div>
    </div>
  );
};

export default Home;
