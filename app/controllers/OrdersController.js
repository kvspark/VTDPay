// controllers/OrdersController.js
const OrdersService = require('../services/OrdersService');

class OrdersController {
    static async buyAirtime(req, res) {
        try {
            const result = await OrdersService.airtime(req);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error buying airtime:", error.message);
            return res.status(500).json({
                success: false,
                message: error
            });
        }
    }

    static async buyData(req, res) {
        try {
            const result = await OrdersService.dataBundle(req);
            return res.status(200).json(result);
        } catch (error) {
            // console.error("Error buying Data:", error.message);
            return res.status(500).json({
                success: false,
                message: error
            });
        }
    }

    static async buyCable(req, res) {
        try {
            const result = await OrdersService.cable(req);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error buying Cable:", error.message);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async buyElectricity(req, res) {
        try {
            const result = await OrdersService.electricity(req);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error Paying Electricity Bill:", error.message);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async fundBetting(req, res) {
        try {
            const result = await OrdersService.betting(req);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error Funding your Betting Wallet:", error.message);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async buyJamb(req, res) {
        try {
            const result = await OrdersService.jamb(req);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error Purchasing Jamb e Pin:", error.message);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async buyWace(req, res) {
        try {
            const result = await OrdersService.wace(req);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error Purchasing wace e-Pin:", error.message);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = OrdersController;
