'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
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
        references: { model: 'Users' },
        onDelete: "CASCADE"
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      serviceFee: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      cleaningFee: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      bedrooms: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      beds: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      baths: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      maxGuests: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
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
        type: Sequelize.STRING
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
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  down: (queryInterface, Sequelize) => {
    options.tableName ='Listings'

    return queryInterface.dropTable(options);
  }
};
