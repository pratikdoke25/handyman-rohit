import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the CSS file for styling

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">MyApp</h1>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <Link className="nav-link" to="/profile">Profile</Link>
            <button className="nav-link logout-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
