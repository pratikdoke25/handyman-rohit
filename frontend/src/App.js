import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import VendorLogin from './components/Auth/VendorLogin';
import VendorRegister from './components/Auth/VendorRegister';
import UserDashboard from './components/User/UserDashboard';
import VendorDashboard from './components/Vendor/VendorDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import Profile from './components/User/Profile';  // Import Profile component
import UserRequests from './components/User/UserRequests';  // Import User Requests component
import UserFormPage from './components/User/UserFormPage';  // Ensure this import exists

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Check for logged-in user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserRole(parsedUser.role);
    }
  }, []);

  // Handle login
  const handleLogin = (role) => {
    console.log('Login successful, role:', role); // Debugging
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem('user', JSON.stringify({ role }));

    if (role === 'vendor') {
      navigate('/vendor-dashboard');
    } else if (role === 'user') {
      navigate('/user-dashboard');
    } else if (role === 'admin') {
      navigate('/admin-dashboard');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Logged out successfully!');
    navigate('/');
  };

  // Handle registration success
  const handleRegisterSuccess = (role) => {
    handleLogin(role);
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} userRole={userRole} />
      <Routes>
        {/* User Login/Register */}
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegisterSuccess={handleRegisterSuccess} />} />

        {/* Vendor Login/Register */}
        <Route path="/vendor-login" element={<VendorLogin onLogin={handleLogin} />} />
        <Route path="/vendor-register" element={<VendorRegister onRegisterSuccess={handleRegisterSuccess} />} />

        {/* User Dashboard */}
        <Route
          path="/user-dashboard"
          element={isLoggedIn && userRole === 'user' ? <UserDashboard /> : <Login onLogin={handleLogin} />}
        />

        {/* Vendor Dashboard */}
        <Route
          path="/vendor-dashboard"
          element={isLoggedIn && userRole === 'vendor' ? <VendorDashboard /> : <VendorLogin onLogin={handleLogin} />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={isLoggedIn && userRole === 'admin' ? <AdminDashboard /> : <Login onLogin={handleLogin} />}
        />

        {/* Profile, User Requests, and User Form */}
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login onLogin={handleLogin} />} />
        <Route path="/user-requests" element={isLoggedIn ? <UserRequests /> : <Login onLogin={handleLogin} />} />
        <Route path="/user-form" element={isLoggedIn ? <UserFormPage /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </>
  );
};

export default App;
