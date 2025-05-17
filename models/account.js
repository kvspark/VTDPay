'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Account.init({
    account_name: DataTypes.STRING,
    account_number: DataTypes.STRING,
    bank_name: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'Accounts',
    modelName: 'Account',
  });
  return Account;
};