import React, { useState } from 'react';

const UserFormPage = ({ onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    handyman: '',
    query: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(formData), // Convert form data to JSON string
      });

      const data = await response.json(); // Parse the JSON response
      console.log('Response from server:', data); // Log the server response

      if (response.ok) { // Check if the response is OK
        if (typeof onUpdate === 'function') {
          onUpdate(formData); // Call the onUpdate function with the form data
        }
        // Reset the form
        setFormData({
          name: '',
          email: '',
          phone: '',
          handyman: '',
          query: '',
        });
      } else {
        console.error('Error submitting form:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error submitting form:', error); // Log any error that occurs
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Handyman:
          <select
            name="handyman"
            value={formData.handyman}
            onChange={handleChange}
            required
          >
            <option value="">Select a handyman</option>
            <option value="painter">Painter</option>
            <option value="electrician">Electrician</option>
            {/* Add more options here if needed */}
          </select>
        </label>
      </div>
      <div>
        <label>
          Query:
          <textarea
            name="query"
            value={formData.query}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserFormPage;
