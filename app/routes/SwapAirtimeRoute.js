const express = require('express');
const router = express.Router();
const SwapAirtimeController = require('../controllers/SwapAirtimeController');

router.post('/', SwapAirtimeController.create);
router.get('/', SwapAirtimeController.getAll);
router.get('/first', SwapAirtimeController.getFirst);
router.get('/:id', SwapAirtimeController.getById);
router.put('/:id', SwapAirtimeController.update);
router.delete('/:id', SwapAirtimeController.delete);

module.exports = router;
