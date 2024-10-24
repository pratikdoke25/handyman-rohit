import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Login from './components/Auth/Login'; 
import Register from './components/Auth/Register'; 
import VendorLogin from './components/Auth/VendorLogin'; 
import VendorRegister from './components/Vendor/VendorRegister'; 
import UserDashboard from './components/User/UserDashboard'; 
import VendorDashboard from './components/Vendor/VendorDashboard'; 
import AdminDashboard from './components/Admin/AdminDashboard'; 
import AdminLogin from './components/Admin/AdminLogin'; 
import Profile from './components/User/Profile'; 
import UserRequests from './components/User/UserRequests'; 
import UserFormPage from './components/User/UserFormPage'; 

const App = () => {
  const userRole = localStorage.getItem('userRole'); // Assuming you store user role in local storage
  const vendorRole = localStorage.getItem('vendorRole'); // Assuming you store vendor role in local storage

  return (
    <>
      <Navbar />
      <Routes>
        {/* User Login/Register */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Vendor Login/Register */}
        <Route path="/vendor-login" element={<VendorLogin />} />
        <Route path="/vendor-register" element={<VendorRegister />} />

        {/* User Dashboard */}
        {/* Uncomment to enable User Dashboard */}
        {/* <Route path="/user-dashboard" element={<UserDashboard />} /> */}

        {/* Admin Dashboard */}
        {/* Uncomment to enable Admin Dashboard */}
        <Route path="/admin-login" exact component={AdminLogin} />
                <Route path="/admin-dashboard" component={AdminDashboard} />

        {/* Profile, User Requests, and User Form */}
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/user-requests" element={<UserRequests />} />
        <Route path="/user-form" element={<UserFormPage />} /> 

        {/* Vendor Dashboard */}
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />

        {/* Redirect based on user role */}
        <Route path="/user-dashboard" element={userRole ? <UserDashboard /> : <Navigate to="/" />} />
        <Route path="/admin-dashboard" element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
