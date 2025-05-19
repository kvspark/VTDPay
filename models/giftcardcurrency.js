'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GiftCardCurrency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GiftCardCurrency.belongsTo(models.GiftCard, {
        foreignKey: 'gift_card_id',
        as: 'giftCard',
      });
      
    }
  }
  GiftCardCurrency.init({
    gift_card_id: DataTypes.INTEGER,
    gift_currency: DataTypes.STRING,
    exchange_rate: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'GiftCardCurrency',
  });
  return GiftCardCurrency;
};