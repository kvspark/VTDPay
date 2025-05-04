const { Model } = require("sequelize")

class CallBackController {
    static callBack = async (req, res) => {
        try {
            const callBackData = req.query
            console.log(callBackData)
            return res.status(200).json(callBackData)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error.message)
        }
    }
}

module.exports = CallBackController