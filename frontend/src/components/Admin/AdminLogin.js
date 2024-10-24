// AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate

    // Hard-coded credentials
    const hardCodedUsername = 'admin';
    const hardCodedPassword = 'password123';

    const handleLogin = (e) => {
        e.preventDefault();

        // Check credentials
        if (username === hardCodedUsername && password === hardCodedPassword) {
            // Redirect to Admin Dashboard on successful login
            navigate('/admin-dashboard'); // Use navigate instead of history.push
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default AdminLogin;
