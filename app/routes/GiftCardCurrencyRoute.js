const express = require('express');
const router = express.Router();
const GiftCardCurrencyController = require('../controllers/GiftCardCurrencyController');

router.post('/', GiftCardCurrencyController.create);
router.get('/', GiftCardCurrencyController.getAll);
router.get('/:id', GiftCardCurrencyController.getOne);
router.post('/update/:id', GiftCardCurrencyController.update);
router.get('delete/:id', GiftCardCurrencyController.delete);

module.exports = router;
