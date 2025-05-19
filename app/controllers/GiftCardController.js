const GiftCardService = require('../services/GiftCardService');

class GiftCardController {
  static create = async (req, res) => {
    try {
      const giftCard = await GiftCardService.createGiftCard(req.body);
      res.status(201).json({ success: true, giftCard });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  static getAll = async (req, res) => {
    try {
      const giftCards = await GiftCardService.getAllGiftCards();
      res.status(200).json(giftCards);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  static getOne = async (req, res) => {
    try {
      const giftCard = await GiftCardService.getGiftCardById(req.params.id);
      res.status(200).json(giftCard);
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  static update = async (req, res) => {
    try {
      const updated = await GiftCardService.updateGiftCard(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Updated Successfully', updated });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  static delete = async (req, res) => {
    try {
      const result = await GiftCardService.deleteGiftCard(req.params.id);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  };
}

module.exports = GiftCardController;
