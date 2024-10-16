import React from 'react';
import './VendorDashboard.css'; // Optional: Import your CSS file for styling

// Sample data for user requests
const userRequests = [
  { id: 1, userName: 'User One', request: 'Request for product information', status: 'Pending' },
  { id: 2, userName: 'User Two', request: 'Inquiry about delivery', status: 'Completed' },
  { id: 3, userName: 'User Three', request: 'Feedback on recent order', status: 'In Progress' },
];

const VendorDashboard = () => {
  return (
    <div>
      <h2>Vendor Dashboard</h2>
      <h3>User Requests</h3>
      <div className="request-cards-container">
        {userRequests.map((request) => (
          <div key={request.id} className="request-card">
            <h4>{request.userName}</h4>
            <p>{request.request}</p>
            <p>Status: <strong>{request.status}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorDashboard;
