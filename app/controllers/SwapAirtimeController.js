const SwapAirtimeService = require('../services/SwapAirtimeService');

class SwapAirtimeController {
  static create = async (req, res) => {
    try {
      const swap = await SwapAirtimeService.createSwapAirtime(req.body);
      res.status(201).json(swap);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  static getAll = async (req, res) => {
    try {
      const swaps = await SwapAirtimeService.getAllSwapAirtime();
      res.json(swaps);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  static getById = async (req, res) => {
    try {
      const swap = await SwapAirtimeService.getSwapAirtimeById(req.params.id);
      if (!swap) return res.status(404).json({ error: 'Not found' });
      res.json(swap);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  static update = async (req, res) => {
    try {
      const swap = await SwapAirtimeService.updateSwapAirtime(req.params.id, req.body);
      res.json(swap);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  static delete = async (req, res) => {
    try {
      await SwapAirtimeService.deleteSwapAirtime(req.params.id);
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  static getFirst = async (req, res) => {
    try {
      const swap = await SwapAirtimeService.getFirstSwapAirtime();
      res.json(swap);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

module.exports = SwapAirtimeController;
