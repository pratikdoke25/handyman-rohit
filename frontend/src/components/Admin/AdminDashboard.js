import React, { useState } from 'react';

// Sample data for users and vendors
const initialUsers = [
  { id: 1, name: 'User One', blocked: false },
  { id: 2, name: 'User Two', blocked: false },
];

const initialVendors = [
  { id: 1, name: 'Vendor One', blocked: false },
  { id: 2, name: 'Vendor Two', blocked: false },
];

const AdminDashboard = () => {
  const [users, setUsers] = useState(initialUsers);
  const [vendors, setVendors] = useState(initialVendors);

  // Function to toggle block/unblock for users
  const toggleUserBlock = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, blocked: !user.blocked } : user
    ));
  };

  // Function to toggle block/unblock for vendors
  const toggleVendorBlock = (id) => {
    setVendors(vendors.map(vendor => 
      vendor.id === id ? { ...vendor, blocked: !vendor.blocked } : vendor
    ));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Manage Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} 
            <button onClick={() => toggleUserBlock(user.id)}>
              {user.blocked ? 'Unblock' : 'Block'}
            </button>
          </li>
        ))}
      </ul>

      <h3>Manage Vendors</h3>
      <ul>
        {vendors.map(vendor => (
          <li key={vendor.id}>
            {vendor.name} 
            <button onClick={() => toggleVendorBlock(vendor.id)}>
              {vendor.blocked ? 'Unblock' : 'Block'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
