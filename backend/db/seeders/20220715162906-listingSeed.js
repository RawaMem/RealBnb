'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Listings', [
    {
      ownerId: '3',
      previewImageUrl: false,
      name: 'Hotel California',
      description: 'Welcome to the Hotel California, such a lovely place, such a lovely face, plenty of room at the Hotel California, any time of year, you can find it here.',
      serviceFee: 24.99,
      cleaningFee: 29.99,
      numRooms: 5,
      maxGuests: 10,
      address: '9876 Wilshire Blvd',
      city: 'Beverly Hills',
      state: 'CA',
      zipCode: 90210,
      longitude: '',
      latitude: ''
   },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Listings', null, {});
  }
};
