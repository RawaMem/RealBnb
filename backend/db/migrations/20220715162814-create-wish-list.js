'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('WishLists', {
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
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      checkIn: {
        allowNull: false,
        type: Sequelize.DATE
      },
      checkOut: {
        allowNull: false,
        type: Sequelize.DATE
      },
      adultGuests: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      childGuests: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      infantGuests: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      petGuests: {
        allowNull: false,
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
    return queryInterface.dropTable('WishLists');
  }
};
