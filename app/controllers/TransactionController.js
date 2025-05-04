const TransactionService = require('../services/TransactionService');

class TransactionController {
  static async create(req, res) {
    try {
      const transaction = await TransactionService.create(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({success: false, message: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const transactions = await TransactionService.findAll();
      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json({success: false, message: error.message });
    }
  }

  static async userTransaction(req, res) {
    try {
      const transactions = await TransactionService.userTransactions(req);
      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json({success: false, message: error.message });
    }
  }

  static async getOne(req, res) {
    try {
      const transaction = await TransactionService.findOne(req.params.id);
      if (!transaction) {
        return res.status(404).json({success: false, message: 'Transaction not found' });
      }
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json({success: false, message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const transaction = await TransactionService.update(req.params.id, req.body);
      res.status(200).json(transaction);
    } catch (error) {
      res.status(400).json({success: false, message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const result = await TransactionService.delete(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({success: false, message: error.message });
    }
  }
}

module.exports = TransactionController;
