import React, { useEffect } from 'react';
import './App.css';
import Home from './Home';
import AdminHome from './AdminHome';
import Profile from './Profile';
import SignIn from './SignIn';
import Form from './Form';
import Search from './Search';
import Register from './Register';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext'; // Ensure this path is correct
import bannerImage from './images/banner.jpg';


function Navigation() {
  const { isAuthenticated, isAdmin } = useAuth();
  console.log('Navigation render', { isAuthenticated, isAdmin });


  useEffect(() => {
    console.log('Authentication state changed:', isAuthenticated, isAdmin);
  }, [isAuthenticated, isAdmin]);

  if (!isAuthenticated) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="navbar-container"> {/* This container wraps both the banner and navigation links */}
        <div className="banner-image" style={{ backgroundImage: `url(${bannerImage})` }}></div> {/* Inline style for the banner image */}
        <div className="nav-links"> {/* Navigation links container */}
          <NavLink to="/home" activeClassName="active">Home</NavLink>
          <NavLink to="/profile" activeClassName="active">Profile</NavLink>
          <NavLink to="/form" activeClassName="active">Form</NavLink>
          {/* Include other links as needed */}
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="navbar-container"> {/* This container wraps both the banner and navigation links */}
        <div className="banner-image" style={{ backgroundImage: `url(${bannerImage})` }}></div> {/* Inline style for the banner image */}
        <div className="nav-links"> {/* Navigation links container */}
          <NavLink to="/admin-home" activeClassName="active">Home</NavLink>
          <NavLink to="/search" activeClassName="active">Search</NavLink>
          {/* Include other links as needed */}
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/admin-home" element={<AdminHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/form" element={<Form />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
