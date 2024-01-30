import React from 'react';
import './App.css';
import SignIn from './SignIn';
import Register from './Register';
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
              <Routes>
                  {/* This route is for home component 
        with exact path "/", in component props 
        we passes the imported component*/}
                  <Route
                      exact
                      path="/"
                      element={<SignIn />}
                  />

                  {/* This route is for about component 
        with exact path "/about", in component 
        props we passes the imported component*/}
                  <Route
                      path="/register"
                      element={<Register />}
                  />

              </Routes>
          </Router>
      </>
  );
}

export default App;
