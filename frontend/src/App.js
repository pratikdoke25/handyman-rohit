import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'; // Added useNavigate
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserDashboard from './components/User/UserDashboard';
import VendorDashboard from './components/Vendor/VendorDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // To manage user roles (e.g., user, vendor, admin)
  const navigate = useNavigate(); // Added useNavigate to handle redirects

  // Handle login, set role and isLoggedIn
  const handleLogin = (role) => {
    console.log('Logged in as:', role); // Debugging step
    setIsLoggedIn(true);
    setUserRole(role);
  };

  // Handle logout, reset login state and clear storage
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);

    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    alert('Logged out successfully!'); // Optional alert

    // Redirect to the login page after successful logout
    navigate('/'); // Use navigate to redirect to the login page
  };

  // Handle registration success and set role
  const handleRegisterSuccess = (role) => {
    console.log('Registered as:', role); // Debugging step
    setIsLoggedIn(true);
    setUserRole(role);
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route 
          path="/" 
          element={<Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/register" 
          element={<Register onRegisterSuccess={handleRegisterSuccess} />} 
        />
        <Route 
          path="/user-dashboard" 
          element={
            isLoggedIn && userRole === 'user' 
            ? <UserDashboard /> 
            : <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/vendor-dashboard" 
          element={
            isLoggedIn && userRole === 'vendor' 
            ? <VendorDashboard /> 
            : <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/admin-dashboard" 
          element={
            isLoggedIn && userRole === 'admin' 
            ? <AdminDashboard /> 
            : <Login onLogin={handleLogin} />
          } 
        />
      </Routes>
    </>
  );
};

export default App;
