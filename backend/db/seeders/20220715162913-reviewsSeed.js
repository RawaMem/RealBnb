'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Reviews', [
    {
      authorId: 1,
      listingId: 2,
      content: 'Wow what an amazing airBnb',
      starRating: 5,
      cleanliness: 4,
      communication: 5,
      checkIn: 4,
      accuracy: 5,
      location: 4,
      value: 4,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
      authorId: 1,
      listingId: 3,
      content: 'I had such a great time.',
      starRating: 4,
      cleanliness: 3,
      communication: 4,
      checkIn: 5,
      accuracy: 3,
      location: 3,
      value: 5,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
      authorId: 1,
      listingId: 4,
      content: 'Cant wait to go again',
      starRating: 4,
      cleanliness: 2,
      communication: 2,
      checkIn: 4,
      accuracy: 5,
      location: 4,
      value: 3,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
      authorId: 1,
      listingId: 5,
      content: 'It was just kinda ok kinda.',
      starRating: 2,
      cleanliness: 2,
      communication: 3,
      checkIn: 1,
      accuracy: 2,
      location: 3,
      value: 2,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
      authorId: 2,
      listingId: 1,
      content: 'Everyone should check it out',
      starRating: 3,
      cleanliness: 4,
      communication: 5,
      checkIn: 3,
      accuracy: 3,
      location: 4,
      value: 4,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
      authorId: 2,
      listingId: 3,
      content: 'Is this place even real?',
      starRating: 5,
      cleanliness: 3,
      communication: 4,
      checkIn: 3,
      accuracy: 3,
      location: 4,
      value: 4,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
      authorId: 2,
      listingId: 4,
      content: 'Its just kinda average, you know?',
      starRating: 4,
      cleanliness: 4,
      communication: 5,
      checkIn: 4,
      accuracy: 4,
      location: 4,
      value: 4,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
      authorId: 2,
      listingId: 5,
      content: 'Really enjoyed our time here.',
      starRating: 4,
      cleanliness: 1,
      communication: 4,
      checkIn: 4,
      accuracy: 3,
      location: 4,
      value: 4,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
      authorId: 3,
      listingId: 1,
      content: 'Check in took a while but other than that great.',
      starRating: 5,
      cleanliness: 4,
      communication: 5,
      checkIn: 2,
      accuracy: 3,
      location: 4,
      value: 5,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
      authorId: 3,
      listingId: 2,
      content: "Perfection. Chef's kiss. Magnifique.",
      starRating: 5,
      cleanliness: 5,
      communication: 5,
      checkIn: 5,
      accuracy: 5,
      location: 5,
      value: 5,
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
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
