const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

// Register Route
router.post('/vendor-register', vendorController.registerVendor);

// Login Route
router.post('/vendor-login', vendorController.loginVendor);

module.exports = router;
