import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isLoggedIn, onLogout, userRole }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">MyApp</h1>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            {/* Show these links after login for all users */}
            <Link className="nav-link" to="/profile">Profile</Link>
            <Link className="nav-link" to="/user-requests">User Requests</Link>
            <Link className="nav-link" to="/user-form">User Form</Link>
          
            {/* Show role-specific dashboard links */}
            {userRole === 'vendor' && (
              <Link className="nav-link" to="/vendor-dashboard">Vendor Dashboard</Link>
            )}
            {userRole === 'user' && (
              <Link className="nav-link" to="/user-dashboard">User Dashboard</Link>
            )}
            {userRole === 'admin' && (
              <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
            )}

            <button className="nav-link logout-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            {/* Show login/register links when not logged in */}
            <Link className="nav-link" to="/">User Login</Link>
            <Link className="nav-link" to="/register">User Register</Link>

            <Link className="nav-link" to="/vendor-login">Vendor Login</Link>
            <Link className="nav-link" to="/vendor-register">Vendor Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
