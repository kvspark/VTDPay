const express = require("express");
const TransactionController = require("../controllers/TransactionController");
const router = express.Router()
const { userMiddleware } = require('../middleware/UserMiddleware')


router.post('/', TransactionController.create);
router.get('/user', userMiddleware, TransactionController.userTransaction);
router.get('/', TransactionController.getAll);
router.get('/:id', TransactionController.getOne);
router.put('/:id', TransactionController.update);
router.delete('/:id', TransactionController.delete);

module.exports = router
