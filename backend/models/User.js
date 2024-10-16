const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'vendor', 'admin'] },
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
