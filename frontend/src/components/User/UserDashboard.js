import React, { useEffect, useState } from 'react';
import UserForm from './UserForm';
import './UserDashboard.css';

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the user info from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      console.error('User not found in local storage');
    }
  }, []);

  const handleUserUpdate = (updatedInfo) => {
    // Update the user state with new info
    const updatedUser = { ...user, ...updatedInfo };
    setUser(updatedUser);
    
    // Optionally store the updated user in localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  if (!user) {
    return <p>Loading user information...</p>;
  }

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>

      {/* User Profile */}
      <div className="user-profile">
        <div className="profile-icon">👤</div>
        <div className="user-info">
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      </div>

      {/* Example of showing requests */}
      <div className="user-requests">
        <h3>Your Requests</h3>
        <ul>
          <li>Request 1</li>
          <li>Request 2</li>
          <li>Request 3</li>
        </ul>
      </div>

      {/* Include the UserForm */}
      <UserForm onUpdate={handleUserUpdate} />
    </div>
  );
};

export default UserDashboard;
