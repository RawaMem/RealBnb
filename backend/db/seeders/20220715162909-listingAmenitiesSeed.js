'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('People', [
      {
        listingId: 1,
        amenityId: 1
      },
      {
        listingId: 1,
        amenityId: 2
      },
      {
        listingId: 1,
        amenityId: 3
      },
      {
        listingId: 1,
        amenityId: 4
      },
      {
        listingId: 1,
        amenityId: 5
      },
      {
        listingId: 1,
        amenityId: 6
      },
      {
        listingId: 1,
        amenityId: 7
      },
      {
        listingId: 1,
        amenityId: 8
      },
      {
        listingId: 1,
        amenityId: 9
      },
      {
        listingId: 1,
        amenityId: 10
      },
      {
        listingId: 1,
        amenityId: 11
      },
      {
        listingId: 1,
        amenityId: 12
      },
      {
        listingId: 1,
        amenityId: 13
      },
      {
        listingId: 1,
        amenityId: 14
      },
      {
        listingId: 1,
        amenityId: 15
      },
      {
        listingId: 1,
        amenityId: 16
      },
      {
        listingId: 1,
        amenityId: 17
      },
      {
        listingId: 1,
        amenityId: 18
      },
      {
        listingId: 1,
        amenityId: 19
      },
      {
        listingId: 1,
        amenityId: 20
      },
      {
        listingId: 2,
        amenityId: 1
      },
      {
        listingId: 2,
        amenityId: 2
      },
      {
        listingId: 2,
        amenityId: 3
      },
      {
        listingId: 2,
        amenityId: 4
      },
      {
        listingId: 2,
        amenityId: 5
      },
      {
        listingId: 3,
        amenityId: 6
      },
      {
        listingId: 3,
        amenityId: 7
      },
      {
        listingId: 3,
        amenityId: 8
      },
      {
        listingId: 3,
        amenityId: 9
      },
      {
        listingId: 3,
        amenityId: 10
      },
      {
        listingId: 4,
        amenityId: 11
      },
      {
        listingId: 4,
        amenityId: 12
      },
      {
        listingId: 4,
        amenityId: 13
      },
      {
        listingId: 4,
        amenityId: 14
      },
      {
        listingId: 4,
        amenityId: 15
      },
      {
        listingId: 5,
        amenityId: 16
      },
      {
        listingId: 5,
        amenityId: 17
      },
      {
        listingId: 5,
        amenityId: 18
      },
      {
        listingId: 5,
        amenityId: 19
      },
      {
        listingId: 5,
        amenityId: 20
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('People', null, {});
  }
};
