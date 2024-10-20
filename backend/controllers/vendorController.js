const Vendor = require('../models/vendor');
const jwt = require('jsonwebtoken');

// Register Vendor
exports.registerVendor = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({ message: 'Vendor already exists' });
        }

        const vendor = new Vendor({ name, email, password, role });
        await vendor.save();
        res.status(201).json({ message: 'Vendor registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login Vendor
exports.loginVendor = async (req, res) => {
    const { email, password } = req.body;
    try {
        const vendor = await Vendor.findOne({ email });
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        const isMatch = await vendor.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ vendorId: vendor._id }, 'secretkey', { expiresIn: '1h' });
        res.status(200).json({ token, vendor });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
