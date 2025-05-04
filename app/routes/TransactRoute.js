// routes/orders.js
const express = require('express');
const router = express.Router();
const TransactController = require('../controllers/TransactController');
const { userMiddleware } = require('../middleware/UserMiddleware');



router.post('/deposit', TransactController.deposit);
router.post('/withdrawal', userMiddleware, TransactController.withdrawal);

module.exports = router;
