'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Full name is required.' },
        notEmpty: { msg: 'Full name cannot be empty.' },
      },
    },
    last_name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:{msg: 'Username is already taken'},
      validate:{
        notNull: 'Username cannot be null'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Email has already be used.' },
      validate: {
        notNull: { msg: 'Email is required.' },
        notEmpty: { msg: 'Email cannot be empty.' },
        isEmail: { msg: 'Email must be a valid email address.' },
      },
    },
    
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Email has already be used.' },
      validate: {
        notNull: { msg: 'Phone Number is required.' },
        notEmpty: { msg: 'Phone Number cannot be empty.' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password is required.' },
        notEmpty: { msg: 'Password cannot be empty.' },
        len: {
          args: [8, 100],
          msg: 'Password must be at least 8 characters long.',
        },
      },
    },
    referral_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    my_referral_code: {
      type: DataTypes.STRING,
      unique: { msg: 'Referral code must be unique.' },
    },
    balance: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
      defaultValue: 0.00,
      validate: {
        min: { args: [0], msg: 'Balance cannot be negative.' },
      },
    },
    secret_question: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    secret_question_answer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    account_status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended'),
      allowNull: false,
      defaultValue: 'active',
      validate: {
        isIn: {
          args: [['active', 'inactive', 'suspended']],
          msg: 'Account status must be either active, inactive, or suspended.',
        },
      },
    },
    profile_photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },  
      
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  });
  return User;
};