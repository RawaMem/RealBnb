'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Listings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      previewImageId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Images' }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      serviceFee: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      serviceFee: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      cleaningFee: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      numRooms: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      maxGuests: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      longitude: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      latitude: {
        allowNull: false,
        type: Sequelize.DECIMAL
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
    return queryInterface.dropTable('Listings');
  }
};
