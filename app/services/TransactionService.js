const { where } = require('sequelize');
const { Transaction, User } = require('../../models');

class TransactionService {
  static async create(data) {
    return await Transaction.create(data);
  }

  static async findAll() {
    return await Transaction.findAll({
      order: [['id', 'desc']]
    });
  }

  static async userTransactions(data) {
    const user = await User.findOne({
      where: {email: data.user.email}
    })
    if(!user)
    {
      throw new Error('User Transaction not found')
    }
    const userTx = await Transaction.findAll({
      where: {user_id: user.id},
      order: [['id', 'desc']]
    })
    if(userTx.length === 0)
    {
      throw new Error('Transaction not Found')
    }
    return userTx
  }

  static async findOne(id) {
    return await Transaction.findByPk(id);
  }

  static async update(id, data) {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) throw new Error('Transaction not found');
    await transaction.update(data);
    return transaction;
  }

  static async delete(id) {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) throw new Error('Transaction not found');
    await transaction.destroy();
    return { message: 'Transaction deleted successfully' };
  }
}

module.exports = TransactionService;
