// models/UserForm.js
const mongoose = require('mongoose');

const UserFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  handyman: {
    type: String,
    enum: ['painter', 'electrician'], // Add more options if needed
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('UserForm', UserFormSchema);
