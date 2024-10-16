const User = require('../models/User'); // Assuming User is your MongoDB model
const jwt = require('jsonwebtoken');    // For creating JWT

// Controller for user login
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(400).json({ message: 'User not found or incorrect role.' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Incorrect password.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password, // Store the password without hashing
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

//get profile
exports.getProfile = async (req, res) => {
  const { userId } = req.params; // Assuming user ID is passed as a URL parameter

  try {
    // Retrieve the user by ID
    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      // Include other fields you want to display
    });
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};