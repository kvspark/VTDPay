'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },      
      last_name:{
        type: Sequelize.STRING,
        allowNull:false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      referral_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      my_referral_code: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      balance: {
        type: Sequelize.DECIMAL(11,2),
        defaultValue: "0.00",
        allowNull: false,
      },
      secret_question: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      secret_question_answer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      account_status: {
        type: Sequelize.ENUM('active', 'inactive', 'suspended'),
        allowNull: false,
        defaultValue: 'active',
      },
      profile_photo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};