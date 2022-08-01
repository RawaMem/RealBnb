'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('ListingCategories', [
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
    return queryInterface.bulkDelete('ListingCategories', null, {});
  }
};
