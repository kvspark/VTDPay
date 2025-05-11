const express = require("express");
const { userMiddleware } = require("../middleware/UserMiddleware");
const ProductController = require("../controllers/ProductController");
const router = express.Router()


router.get('/airtime', ProductController.airtime)
router.get('/data-bundle', ProductController.dataBundle)
router.get('/electricity-bill', ProductController.electricityBill)
router.get('/betting', ProductController.betting)
router.get('/jamb', ProductController.jamb)
router.get('/wace', ProductController.wace)
router.get('/cable', ProductController.cable)
router.get('/check-balance', ProductController.vtuBalance)
// router.get('/check-balance', ProductController.vtuBalance)

module.exports = router
