import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css'; // Assuming you have a separate CSS file for styling

const Login = ({ onLogin }) => { // Add onLogin here
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const navigate = useNavigate(); // Initialize navigate

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (response.ok) {
        const { token, user } = await response.json();

        // Store the token and user information in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        console.log('Login successful:', user);

        // Pass the user role to the onLogin handler in App.js
        onLogin(user.role); // Pass role here

        // Use navigate to redirect based on role
        if (user.role === 'user') {
          navigate('/user-dashboard');
        } else if (user.role === 'vendor') {
          navigate('/vendor-dashboard');
        } else if (user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          console.error('Unknown role:', user.role);
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="vendor">Vendor</option>
        </select>
        <button type="submit">Login</button>
      </form>
      <div className="auth-links">
        <a href="/register">Create a New Account</a>
        <a href="/forgot-password">Forgot Password?</a>
      </div>
    </div>
  );
};

export default Login;
