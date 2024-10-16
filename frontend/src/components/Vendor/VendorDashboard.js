import React, { useEffect, useState } from 'react';
import './VendorDashboard.css'; // Optional: Import your CSS file for styling

const VendorDashboard = () => {
  const [userRequests, setUserRequests] = useState([]); // State to hold user requests
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    // Function to fetch user requests from the backend
    const fetchUserRequests = async () => {
      try {
        // Replace with your API endpoint
        const response = await fetch('http://localhost:5000/api/forms'); 
        const data = await response.json();
        setUserRequests(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching user requests:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserRequests(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div>
      <h2>Vendor Dashboard</h2>
      <h3>User Requests</h3>
      {loading ? ( // Show loading message while data is being fetched
        <p>Loading user requests...</p>
      ) : (
        <div className="request-cards-container">
          {userRequests.length > 0 ? (
            userRequests.map((request) => (
              <div key={request._id} className="request-card"> {/* Use unique ID */}
                <h4>{request.name}</h4> {/* Assuming you have a 'name' field in your request data */}
                <p>{request.query}</p> {/* Assuming 'query' contains the request description */}
                <p>Status: <strong>{request.status}</strong></p>
              </div>
            ))
          ) : (
            <p>No requests found.</p> // Message when no requests are available
          )}
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
