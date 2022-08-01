'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('ListingAmenities', [
      {
        listingId: 1,
        amenityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 18,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 19,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 1,
        amenityId: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 2,
        amenityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 2,
        amenityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 2,
        amenityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 2,
        amenityId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 2,
        amenityId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 3,
        amenityId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 3,
        amenityId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 3,
        amenityId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 3,
        amenityId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 3,
        amenityId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 4,
        amenityId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 4,
        amenityId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 4,
        amenityId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 4,
        amenityId: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 4,
        amenityId: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 5,
        amenityId: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 5,
        amenityId: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 5,
        amenityId: 18,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 5,
        amenityId: 19,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        listingId: 5,
        amenityId: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('ListingAmenities', null, {});
  }
};
