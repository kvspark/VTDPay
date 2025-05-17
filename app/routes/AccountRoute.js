// routes/accountRoutes.js

const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/AccountController');

router.post('/', AccountController.createAccount);
router.get('/', AccountController.getAllAccounts);
router.get('/first', AccountController.getFirstAccountDetails);
router.get('/:id', AccountController.getAccountById);
router.post('/update/:id', AccountController.updateAccount);
router.delete('/:id', AccountController.deleteAccount);

module.exports = router;
