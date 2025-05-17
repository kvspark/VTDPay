
const { Account } = require('../../models');

class AccountService {
    static createAccount = async (data) => {
    //    await Account.create(data);
    };
  
    static getAllAccounts = async () => {
      return await Account.findAll();
    };
  
    static getAccountById = async (id) => {
      return await Account.findByPk(id);
    };
  
    static updateAccount = async (id, data) => {
      const account = await Account.findByPk(id);
      if (!account) {
        throw new Error('Account not found');
      }
      return await account.update(data);
    };
  
    static deleteAccount = async (id) => {
      const account = await Account.findByPk(id);
      if (!account) {
        throw new Error('Account not found');
      }
      await account.destroy();
    };
  }
  
  module.exports = AccountService;