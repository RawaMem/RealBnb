'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
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
        allowNull: true,
        type: Sequelize.DATE
      },
      checkOut: {
        allowNull: true,
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
    }, options);
  },
  down: (queryInterface, Sequelize) => {
    options.tableName ='WishLists'

    return queryInterface.dropTable(options);
  }
};
