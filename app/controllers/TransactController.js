const TransactService = require("../services/TransactService")

class TransactController {
    static deposit = async (req, res) => {
        try {
            const response = await TransactService.deposit(req.body)
            console.log(response)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
    static withdrawal = async (req, res) => {
        try {
            const response = await TransactService.withdraw(req)
            console.log(response)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}


module.exports = TransactController