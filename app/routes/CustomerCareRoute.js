// routes/customercare.js
const express = require('express');
const router = express.Router();
const CustomerCareController = require('../controllers/CustomerCareController');

router.post('/', CustomerCareController.create);
router.get('/first', CustomerCareController.getFirst);

module.exports = router;
