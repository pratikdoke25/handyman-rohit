import React, { useState } from 'react';

const UserForm = ({ onUpdate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [handyman, setHandyman] = useState('painter');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(''); // To show submission status

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, phone, handyman, query };
    
    try {
      // Send POST request to backend API using fetch
      const response = await fetch('http://localhost:5000/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success
        setStatus('Form submitted successfully');
        
        // Pass the updated info to the parent component via onUpdate prop
        onUpdate(formData);
        
        // Clear form fields after successful submission
        setName('');
        setEmail('');
        setPhone('');
        setHandyman('painter');
        setQuery('');
        
        const data = await response.json();
        console.log('Response from backend:', data);
      } else {
        // Handle failure response
        setStatus('Error submitting the form');
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      // Handle error
      setStatus('Error submitting the form');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <select value={handyman} onChange={(e) => setHandyman(e.target.value)}>
        <option value="painter">Painter</option>
        <option value="electrician">Electrician</option>
        {/* Add more options as needed */}
      </select>
      <textarea
        placeholder="Why do you need the handyman?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <button type="submit">Submit</button>

      {/* Display submission status */}
      {status && <p>{status}</p>}
    </form>
  );
};

export default UserForm;
