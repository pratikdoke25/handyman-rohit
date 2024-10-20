import React, { useEffect, useState } from 'react';
import './Profile.css'; // Assuming you have a separate CSS for Profile

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the stored user ID from local storage
    const storedUserId = localStorage.getItem('userId');
    console.log('Retrieved userId from localStorage:', storedUserId);

    if (storedUserId) {
      // Fetch the user data if userId exists
      fetchUserData(storedUserId);
    } else {
      setError('User not found in local storage');
      setLoading(false);
    }
  }, []);

  // Function to fetch user data from the API using the userId
  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you use a token for authentication
        },
      });

      console.log('API response status:', response.status);
      if (response.ok) {
        const result = await response.json();
        console.log('Fetched user data:', result);

        if (result.success && result.data) {
          setUser(result.data); // Set the user data from result.data
        } else {
          setError('User data not found');
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch user data:', errorData);
        setError('Failed to fetch user data: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('An error occurred while fetching user data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading user information...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      {user && (
        <div className="user-profile">
          <div className="profile-icon">👤</div>
          <div className="user-info">
            <h3>{user.name}</h3> {/* Display user name */}
            <p>Email: {user.email}</p> {/* Display user email */}
            <p>Mobile: {user.mobile}</p> {/* Display user mobile */}
            <p>Role: {user.role}</p> {/* Display user role */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
