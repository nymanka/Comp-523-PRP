import React from 'react';
import './App.css';
import Home from './Home';
import Profile from './Profile';
import SignIn from './SignIn';
import Register from './Register';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



function App() {
  return (
      <>
          {/* This is the alias of BrowserRouter i.e. Router */}
          <Router>
          <nav>
            <NavLink to="/home" activeClassName="active">Home</NavLink>
            <NavLink to="/profile" activeClassName="active">Profile</NavLink>
          </nav>
              <Routes>
                  {/* */}
                  <Route
                      exact
                      path="/"
                      element={<SignIn />}
                  />

                  {/* */}
                  <Route
                      path="/register"
                      element={<Register />}
                  />

                  {/* */}
                  <Route
                      exact
                      path="/home"
                      element={<Home />}
                  />

                  {/* */}
                  <Route
                      path="/profile"
                      element={<Profile />}
                  />

              </Routes>
          </Router>
      </>
  );
}

export default App;
