const User = require('../models/User'); // Assuming User is your MongoDB model

// Controller to fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message,
    });
  }
};

// Controller to fetch a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find user by ID from the database
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: error.message,
    });
  }
};

exports.toggleUserStatus = async (req, res) => {
  const { id } = req.params; // Get user ID from request parameters
  try {
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({
              success: false,
              message: 'User not found',
          });
      }

      // Toggle user status
      user.status = user.status === 'active' ? 'blocked' : 'active';

      // Save only the status to the database
      await user.save({ validateModifiedOnly: true }); // Only validate modified fields

      res.status(200).json({
          success: true,
          data: user,
      });
  } catch (error) {
      console.error('Error toggling user status:', error); // Log error for debugging
      res.status(500).json({
          success: false,
          message: 'Failed to toggle user status',
          error: error.message,
      });
  }
};
