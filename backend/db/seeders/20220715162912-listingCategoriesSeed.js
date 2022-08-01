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
          listingId: 1
        },
        {
          categoryId: 4,
          listingId: 1
        },
        {
          categoryId: 1,
          listingId: 2
        },
        {
          categoryId: 4,
          listingId: 2
        },
        {
          categoryId: 5,
          listingId: 3
        },
        {
          categoryId: 2,
          listingId: 4
        },
        {
          categoryId: 4,
          listingId: 5
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
