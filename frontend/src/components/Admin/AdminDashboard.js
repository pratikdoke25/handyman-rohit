import React, { useState, useEffect } from 'react';
import './adminDashboard.css';

const AdminDashboard = () => {
    // State to store user data fetched from API
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch users data from API when component loads
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                // Set default status to 'active' if not provided
                const updatedUsers = data.data.map(user => ({
                    ...user,
                    status: user.status || 'active' // Default to 'active'
                }));
                setUsers(updatedUsers);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Function to toggle block/unblock user status
    const toggleUserStatus = (id) => {
        const updatedUsers = users.map(user => 
            user._id === id ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' } : user
        );
        setUsers(updatedUsers);
    };

    // Loading state
    if (loading) {
        return <p>Loading users...</p>;
    }

    // Error state
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td>
                                {user.status === 'active' ? (
                                    <button className="block-button" onClick={() => toggleUserStatus(user._id)}>Block</button>
                                ) : (
                                    <button className="unblock-button" onClick={() => toggleUserStatus(user._id)}>Unblock</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
