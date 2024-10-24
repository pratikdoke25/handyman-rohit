import React, { useState } from 'react';

const VendorRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  
  const { name, email, password, role } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('http://localhost:5000/api/vendor-register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const data = await res.json();
    
    if (data.message) {
      alert(data.message);
    }
  };

  return (
    <div>
      <h2>Vendor Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={handleChange}
          required
        />
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
        <select name="role" value={role} onChange={handleChange} required>
          <option value="" disabled>Select Role</option>
          <option value="Electrician">Electrician</option>
          <option value="Painter">Painter</option>
          <option value="Worker">Worker</option>
          <option value="Salesman">Salesman</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default VendorRegister;
