// // controllers/userFormController.js
// const UserForm = require('../models/UserForm');

// // Create a new form entry
// exports.createUserForm = async (req, res) => {
//     try {
//       const { name, email, phone, handyman, query } = req.body;
  
//       // Create new form entry
//       const newUserForm = new UserForm({
//         name,
//         email,
//         phone,
//         handyman,
//         query,
//         // status defaults to 'Pending'
//       });
  
//       // Save to the database
//       await newUserForm.save();
//       res.status(201).json({ message: 'Form submitted successfully', newUserForm });
//     } catch (error) {
//       console.error(error); // Log the error to the console
//       res.status(400).json({ message: 'Error submitting the form', error: error.message });
//     }
//   };

// // Get all form entries
// exports.getAllForms = async (req, res) => {
//   try {
//     const forms = await UserForm.find();
//     res.status(200).json(forms);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving forms', error });
//   }
// };

// // Get a single form by ID
// exports.getFormById = async (req, res) => {
//   try {
//     const form = await UserForm.findById(req.params.id);
//     if (!form) {
//       return res.status(404).json({ message: 'Form not found' });
//     }
//     res.status(200).json(form);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving form', error });
//   }
// };

const UserForm = require('../models/UserForm');

// Create a new form entry
exports.createUserForm = async (req, res) => {
    try {
      const { name, email, phone, handyman, query } = req.body;
  
      // Create new form entry
      const newUserForm = new UserForm({
        name,
        email,
        phone,
        handyman,
        query,
        // status defaults to 'Pending'
      });
  
      // Save to the database
      await newUserForm.save();
      res.status(201).json({ message: 'Form submitted successfully', newUserForm });
    } catch (error) {
      console.error(error); // Log the error to the console
      res.status(400).json({ message: 'Error submitting the form', error: error.message });
    }
};

// Get all form entries
exports.getAllForms = async (req, res) => {
  try {
    const forms = await UserForm.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving forms', error });
  }
};

// Get a single form by ID
exports.getFormById = async (req, res) => {
  try {
    const form = await UserForm.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving form', error });
  }
};

// Get forms by handyman type
exports.getFormsByHandyman = async (req, res) => {
  try {
    const handymanType = req.params.handyman;
    const forms = await UserForm.find({ handyman: handymanType });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving forms', error });
  }
};
