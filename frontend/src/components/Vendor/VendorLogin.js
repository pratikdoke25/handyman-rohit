import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Add success state for debugging
  const navigate = useNavigate();

  // Function to handle vendor login
  const vendorLogin = async (email, password) => {
    try {
      console.log("Attempting to log in..."); // Debugging log

      const response = await fetch('http://localhost:5000/api/vendor-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      // Store token, email, and vendor role in local storage
      localStorage.setItem('vendorToken', data.token);
      localStorage.setItem('vendorRole', data.role);
      localStorage.setItem('vendorEmail', data.email);

      console.log('Login successful!'); // Debugging log

      setSuccess('Login successful! Redirecting...'); // Show a success message

      // Redirect to the vendor dashboard
      navigate('/vendor-dashboard');
    } catch (error) {
      setError(error.message);
      console.error('Error:', error); // Log the error to see what went wrong
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success messages
    vendorLogin(email, password); // Call login function with credentials
  };

  return (
    <div className="container">
      <h2>Vendor Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>} {/* Display success message */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

