const express = require("express");
const UserController = require("../controllers/UserController");
const { userMiddleware } = require("../middleware/UserMiddleware");
const router = express.Router()


router.get('/all', UserController.getAllUser)
router.post('/create', UserController.createUser)
router.get('/find', userMiddleware, UserController.findUser)
router.get('/generate-referral', userMiddleware, UserController.generateReferral)
router.post('/login', UserController.loginUser)

module.exports = router
