'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorId: {
        type: Sequelize.INTEGER
      },
      listingId: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      starRating: {
        type: Sequelize.INTEGER
      },
      cleanliness: {
        type: Sequelize.INTEGER
      },
      communication: {
        type: Sequelize.INTEGER
      },
      checkIn: {
        type: Sequelize.INTEGER
      },
      accuracy: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.INTEGER
      },
      value: {
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
    return queryInterface.dropTable('Reviews');
  }
};