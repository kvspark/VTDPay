// controllers/SwapAirtimeController.js

const SwapAirtimeService = require('../services/SwapAirtimeService');

class SwapAirtimeController {
  static createSwapAirtime = async (req, res) => {
    try {
      const data = req.body;
      const newSwap = await SwapAirtimeService.createSwapAirtime(data);
      return res.status(201).json({ success: true, data: newSwap });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  static getFirstSwapAirtime = async (req, res) => {
    try {
      const firstSwap = await SwapAirtimeService.getFirstSwapAirtime();
      if (!firstSwap) {
        return res.status(404).json({ success: false, message: 'No Swap Airtime found' });
      }
      return res.status(200).json({ success: true, data: firstSwap });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  static updateSwapAirtime = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedSwap = await SwapAirtimeService.updateSwapAirtime(id, data);
      return res.status(200).json({ success: true, data: updatedSwap });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
}

module.exports = SwapAirtimeController;
