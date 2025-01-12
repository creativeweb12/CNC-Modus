// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import CNCControl from './components/CNCControl'
import './styles.css';  // Import the CSS file

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <h1 style={{color: "blue" }}> Modus React App</h1>

          {/* Styled Navigation Bar */}
          <nav className="navbar">
            <NavLink to="/login" className="nav-link" activeclassname="active-link">Login</NavLink>
            <NavLink to="/signup" className="nav-link" activeclassname="active-link">Signup</NavLink>
            <NavLink to="/dashboard" className="nav-link" activeclassname="active-link">Dashboard</NavLink>
          </nav>
        </header>

        {/* Route Configuration */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
