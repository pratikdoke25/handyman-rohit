import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import './Login.css'; // Assuming you have a separate CSS file for styling

const Login = ({ onLogin }) => { // Add onLogin to handle login state
  const { id } = useParams(); // Extract user ID from URL params
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { user } = await response.json();

        // Store the token, user ID, and user information in local storage
        localStorage.setItem('userId', user.id || id); // Use extracted ID or user ID
        console.log('Login successful:', user); // Log user information
        console.log(user.id || id); // Log the user ID

        // Call onLogin to update the state in App component with role
        onLogin(user.role);

        // Redirect to user dashboard based on role
        if (user.role === 'user') {
          navigate('/user-dashboard');
        } else if (user.role === 'vendor') {
          navigate('/vendor-dashboard');
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
