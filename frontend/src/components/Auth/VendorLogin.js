import React, { useState } from 'react';
import './VendorLogin.css'; // Import the CSS for styling

const VendorLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('http://localhost:5000/api/vendor-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    
    if (data.token) {
      localStorage.setItem('vendorToken', data.token);
      alert('Login successful');
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <h2>Vendor Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default VendorLogin;
