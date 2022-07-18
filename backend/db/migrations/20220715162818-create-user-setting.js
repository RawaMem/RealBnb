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
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      theme: {
        allowNull: false,
        type: Sequelize.STRING
      },
      recoveryQuestion1: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hashedAnswer1: {
        allowNull: false,
        type: Sequelize.STRING.BINARY
      },
      recoveryQuestion2: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hashedAnswer2: {
        allowNull: false,
        type: Sequelize.STRING.BINARY
      },
      recoveryQuestion3: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hashedAnswer3: {
        allowNull: false,
        type: Sequelize.STRING.BINARY
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
