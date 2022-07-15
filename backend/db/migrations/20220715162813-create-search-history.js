'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SearchHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      destination: {
        type: Sequelize.STRING
      },
      checkIn: {
        type: Sequelize.DATE
      },
      checkOut: {
        type: Sequelize.DATE
      },
      adultGuests: {
        type: Sequelize.INTEGER
      },
      childGuests: {
        type: Sequelize.INTEGER
      },
      infantGuests: {
        type: Sequelize.INTEGER
      },
      petGuests: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('SearchHistories');
  }
};