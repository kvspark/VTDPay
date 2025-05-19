const express = require('express');
const router = express.Router();
const GiftCardController = require('../controllers/GiftCardController');

router.post('/', GiftCardController.create);
router.get('/', GiftCardController.getAll);
router.get('/:id', GiftCardController.getOne);
router.post('/update/:id', GiftCardController.update);
router.get('/delete/:id', GiftCardController.delete);

module.exports = router;
