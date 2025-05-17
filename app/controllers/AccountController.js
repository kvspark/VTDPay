// controllers/AccountController.js

const AccountService = require('../services/AccountService');

class AccountController {
  static createAccount = async (req, res) => {
    try {
      const account = await AccountService.createAccount(req.body);
      if(account)
      {
        res.status(201).json({success: true, message: 'Account Created Successfully'});
      }
    } catch (error) {
      res.status(400).json({success: false, error: error.message });
    }
  };

  static getAllAccounts = async (req, res) => {
    try {
      const accounts = await AccountService.getAllAccounts();
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getAccountById = async (req, res) => {
    try {
      const account = await AccountService.getAccountById(req.params.id);
      if (!account) {
        return res.status(404).json({ error: 'Account not found' });
      }
      res.status(200).json(account);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static updateAccount = async (req, res) => {
    try {
      const account = await AccountService.updateAccount(req.params.id, req.body);
      res.status(200).json({success:true, message: 'Account Details Updated Successfully'});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  static deleteAccount = async (req, res) => {
    try {
      await AccountService.deleteAccount(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getFirstAccountDetails = async (req, res) => {
    try {
      const account = await AccountService.getFirstAccount();
      res.status(201).json(account);
    } catch (error) {
      res.status(500).json({success: false,  error: error.message });
    }
  };
}

module.exports = AccountController;
