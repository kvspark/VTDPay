'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GiftCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GiftCard.hasMany(models.GiftCardCurrency, {
        foreignKey: 'gift_card_id',
        as: 'currencies',
        onDelete: 'CASCADE',
      });
    }
  }
  GiftCard.init({
    card_types: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'GiftCards',
    modelName: 'GiftCard',
  });
  return GiftCard;
};