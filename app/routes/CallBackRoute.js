const express = require("express");
const CallBackController = require("../controllers/CallBackController");
const router = express.Router()


router.get('/', CallBackController.callBack)

module.exports = router
