'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  Transaction.init(
    {
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      transaction_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'NGN',
      },
      status: {
        type: DataTypes.ENUM('pending', 'processing', 'successful', 'failed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      reference: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      description: DataTypes.TEXT,
      meta: DataTypes.JSON,
      remark: DataTypes.STRING,
      channel: DataTypes.STRING,
      is_credit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      balance_before: DataTypes.DECIMAL(10, 2),
      balance_after: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'Transactions',
      underscored: true,
    }
  );

  return Transaction;
};