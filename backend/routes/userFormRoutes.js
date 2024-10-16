// // routes/userFormRoutes.js
// const express = require('express');
// const router = express.Router();
// const { createUserForm, getAllForms, getFormById } = require('../controllers/userFormController');

// // POST request to create a new form entry
// router.post('/form', createUserForm);

// // GET request to retrieve all form entries
// router.get('/forms', getAllForms);

// // GET request to retrieve a form by ID
// router.get('/form/:id', getFormById);

// module.exports = router;

const express = require('express');
const router = express.Router();
const {
  createUserForm,
  getAllForms,
  getFormById,
  getFormsByHandyman // Import the new function
} = require('../controllers/userFormController');

// POST request to create a new form entry
router.post('/form', createUserForm);

// GET request to retrieve all form entries
router.get('/forms', getAllForms);

// GET request to retrieve a form by ID
router.get('/form/:id', getFormById);

// GET request to retrieve forms by handyman type
router.get('/forms/:handyman', getFormsByHandyman); // New route

module.exports = router;
