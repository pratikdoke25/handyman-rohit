import React, { useEffect, useState } from 'react';

const fetchVendorRequests = async (token) => {
  try {
    const response = await fetch('http://localhost:5000/api/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vendor requests');
    }

    const data = await response.json(); // Get the response data
    console.log('Fetched data:', data); // Log the response data for debugging

    return data; // Return the data directly
  } catch (error) {
    console.error('Error fetching vendor requests:', error);
    return null;
  }
};

const VendorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  const vendorRole = localStorage.getItem('vendorRole');
  const vendorToken = localStorage.getItem('vendorToken');
  const vendorEmail = localStorage.getItem('vendorEmail');
    console.log(vendorRole);
  useEffect(() => {
    const getRequests = async () => {
      if (vendorToken) {
        const data = await fetchVendorRequests(vendorToken);

        // Check if the data is an array or handle different formats
        if (Array.isArray(data)) {
          setRequests(data);
        } else if (data && data.requests) {
          // Assuming data has a structure like { requests: [...] }
          setRequests(data.requests);
        } else {
          setError('Invalid data format received');
        }
      } else {
        setError('No vendor token found');
      }
    };

    getRequests();
  }, [vendorToken]);

  if (error) {
    return <div>{error}</div>;
  }

  if (requests.length === 0) {
    return <div>No requests available for your role.</div>;
  }

  return (
    <div className="dashboard">
      <h2>Vendor Dashboard</h2>
      <p><strong>Email:</strong> {vendorEmail}</p>
      <p><strong>Role:</strong> {vendorRole}</p>

      {requests
        .filter((req) => req.handyman === vendorRole)
        .map((request) => (
          <div key={request._id}>
            <h3>Request Details</h3>
            <p><strong>Name:</strong> {request.name}</p>
            <p><strong>Email:</strong> {request.email}</p>
            <p><strong>Phone:</strong> {request.phone}</p>
            <p><strong>Handyman:</strong> {request.handyman}</p>
            <p><strong>Query:</strong> {request.query}</p>
            <p><strong>Submitted At:</strong> {new Date(request.submittedAt).toLocaleString()}</p>
          </div>
        ))}
    </div>
  );
};

export default VendorDashboard;
