// routes/orders.js
const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/OrdersController');
const { userMiddleware } = require('../middleware/UserMiddleware');



router.post('/airtime', userMiddleware, OrdersController.buyAirtime);
router.post('/data', userMiddleware, OrdersController.buyData);
router.post('/cable', userMiddleware, OrdersController.buyCable);
router.post('/electricity', userMiddleware, OrdersController.buyElectricity);
router.post('/betting', userMiddleware, OrdersController.fundBetting);
router.post('/jamb', userMiddleware, OrdersController.buyJamb);
router.post('/wace', userMiddleware, OrdersController.buyWace);

module.exports = router;
