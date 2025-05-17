// routes/swapAirtimeRoutes.js

const express = require('express');
const router = express.Router();
const SwapAirtimeController = require('../controllers/SwapAirtimeController');

router.post('/swap-airtime', SwapAirtimeController.createSwapAirtime);
router.get('/swap-airtime/first', SwapAirtimeController.getFirstSwapAirtime);
router.put('/swap-airtime/:id', SwapAirtimeController.updateSwapAirtime);

module.exports = router;
