const ProductService = require("../services/ProductService");

class ProductController {
    static airtime = async (req, res) => {
        try {
            const airtime = await ProductService.airtime()
            console.log(airtime)
            return res.status(200).json(airtime)
        } catch (error) {
            // console.log(error)
            return res.status(400).json({success: false, message: error.message || error})
        }
    }
    // static dataBundle = async (req, res) => {
    //     try {
    //         const dataBundle = await ProductService.dataBundle()
    //         console.log(dataBundle)
    //         return res.status(200).json(dataBundle)
    //     } catch (error) {
    //         // console.log(error)
    //         return res.status(400).json({success: false, message: error.message || error})
    //     }
    // }
    static dataBundle = async (req, res) => {
        try {
            const electricityBill = await ProductService.dataBundle()
            console.log(electricityBill)
            return res.status(200).json(electricityBill)
        } catch (error) {
            // console.log(error)
            return res.status(400).json({success: false, message: error.message || error})
        }
    }

    static electricityBill = async (req, res) => {
        try {
            const electricityBill = await ProductService.electricityBill()
            console.log(electricityBill)
            return res.status(200).json(electricityBill)
        } catch (error) {
            // console.log(error)
            return res.status(400).json({success: false, message: error.message || error})
        }
    }

    
    static betting = async (req, res) => {
        try {
            const betting = await ProductService.betting()
            console.log(betting)
            return res.status(200).json(betting)
        } catch (error) {
            // console.log(error)
            return res.status(400).json({success: false, message: error.message || error})
        }
    }

    static jamb = async (req, res) => {
        try {
            const jamb = await ProductService.jamb()
            console.log(jamb)
            return res.status(200).json(jamb)
        } catch (error) {
            // console.log(error)
            return res.status(400).json({success: false, message: error.message || error})
        }
    }

    static wace = async (req, res) => {
        try {
            const wace = await ProductService.wace()
            console.log(wace)
            return res.status(200).json(wace)
        } catch (error) {
            // console.log(error)
            return res.status(400).json({success: false, message: error.message || error})
        }
    }

    static cable = async (req, res) => {
        try {
            const cable = await ProductService.cable()
            console.log(cable)
            return res.status(200).json(cable)
        } catch (error) {
            // console.log(error)
            return res.status(400).json({success: false, message: error.message || error})
        }
    }

    static vtuBalance = async (req, res) => {
        try {
            const balance = await ProductService.vtuBalance()
            console.log(balance)
            return res.status(200).json(balance)
        } catch (error) {
            // console.log(error)
            return res.status(400).json({success: false, message: error.message || error})
        }
    }


}

module.exports = ProductController