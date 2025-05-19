const GiftCardCurrencyService = require('../services/GiftCardCurrencyService');

class GiftCardCurrencyController {
  static create = async (req, res) => {
    try {
      const currency = await GiftCardCurrencyService.create(req.body);
      res.status(201).json({ success: true, message: 'Account Created Successfully', currency });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  static getAll = async (req, res) => {
    try {
      const currencies = await GiftCardCurrencyService.getAll();
      res.status(200).json(currencies );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  static getOne = async (req, res) => {
    try {
      const currency = await GiftCardCurrencyService.getById(req.params.id);
      res.status(200).json( currency );
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  static update = async (req, res) => {
    try {
      const updated = await GiftCardCurrencyService.update(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Account Updated Successfully', updated });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  static delete = async (req, res) => {
    try {
      const result = await GiftCardCurrencyService.delete(req.params.id);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  };
}

module.exports = GiftCardCurrencyController;
