import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import './App.css';
import Home from './Home';
import AdminHome from './AdminHome';
import Profile from './Profile';
import SignIn from './SignIn';
import Form from './Form';
import Search from './Search';
import Register from './Register';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthProvider, useAuth } from './AuthContext'; // Adjust the path if necessary
import bannerImage from './images/banner.jpg';

function Navigation() {
    const { isAuthenticated, isAdmin, logout } = useAuth();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      console.log('Authentication state changed:', isAuthenticated, isAdmin);
      // Additional actions based on authentication state change can be added here
  }, [isAuthenticated, isAdmin]);

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        logout();
        navigate('/');
        setShowLogoutConfirm(false);
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    if (!isAuthenticated || location.pathname === '/') {
        return null;
    }

    return (
        <div className="navbar-container">
            <div className="banner-image" style={{ backgroundImage: `url(${bannerImage})` }}></div>
            <div className="nav-links">
                <NavLink to="/home" activeClassName="active">Home</NavLink>
                {!isAdmin && <NavLink to="/profile" activeClassName="active">Profile</NavLink>}
                {!isAdmin && <NavLink to="/form" activeClassName="active">Form</NavLink>}
                {isAdmin && <NavLink to="/admin-home" activeClassName="active">Home</NavLink>}
                {isAdmin && <NavLink to="/search" activeClassName="active">Search</NavLink>}
                <button className="logout-button" onClick={handleLogoutClick}>
                    Logout
                </button>
            </div>
            {showLogoutConfirm && (
                <div className="logout-confirm-dialog">
                    <p>Are you sure you want to logout?</p>
                    <button onClick={confirmLogout}>Yes</button>
                    <button onClick={cancelLogout}>No</button>
                </div>
            )}
        </div>
    );
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
