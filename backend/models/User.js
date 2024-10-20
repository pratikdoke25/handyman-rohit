const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true, unique: true }, // Added mobile field
  role: { type: String, default: 'user' }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
