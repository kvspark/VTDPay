const UserService = require("../services/UserService")

class UserController {
    static getAllUser = async (req, res) => {
        try {
            const user = await UserService.getUser()
            return res.status(200).json(user)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    
    static createUser = async (req, res) => {
        try {
            const user = await UserService.createUser(req.body)
            if(user)
            {
                console.log(user)
                return res.status(200).json(user)
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }

    static findUser = async (req, res) => {
        try {
            const user = await UserService.findUser(req)
            if(user)
            {
                return res.status(200).json(user)
            }
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    static loginUser = async (req, res) => {
        try {
            const user = await UserService.loginUser(req.body)
            return res.status(200).json(user)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    static generateReferral = async (req, res) => {
        try {
            const referralCode = await UserService.getReferralCode(req)
            return res.status(200).json(referralCode)
        } catch (error) {
            console.log({success: false, message: error.message || error})
        }
    }

}

module.exports = UserController