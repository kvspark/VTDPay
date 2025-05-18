'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerCare extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CustomerCare.init({
    whatsapp: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'CustomerCares',
    modelName: 'CustomerCare',
  });
  return CustomerCare;
};