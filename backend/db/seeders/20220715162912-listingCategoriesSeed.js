'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'ListingCategories'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(options, [
      {
        categoryId: 3,
        listingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 4,
        listingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 1,
        listingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 4,
        listingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 5,
        listingId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 2,
        listingId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 4,
        listingId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
    {

    }
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete(options, null, {});
  }
};
