'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      theme: {
        type: Sequelize.STRING
      },
      recoveryQuestion1: {
        type: Sequelize.STRING
      },
      hashedAnswer1: {
        type: Sequelize.STRING
      },
      recoveryQuestion2: {
        type: Sequelize.STRING
      },
      hashedAnswer2: {
        type: Sequelize.STRING
      },
      recoveryQuestion3: {
        type: Sequelize.STRING
      },
      hashedAnswer3: {
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserSettings');
  }
};