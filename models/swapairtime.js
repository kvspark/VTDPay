'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SwapAirtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SwapAirtime.init({
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SwapAirtime',
  });
  return SwapAirtime;
};