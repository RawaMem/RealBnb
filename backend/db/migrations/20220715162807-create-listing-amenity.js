'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ListingAmenities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amenityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Amenities' }
      },
      listingId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Listings' }
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
    return queryInterface.dropTable('ListingAmenities');
  }
};
