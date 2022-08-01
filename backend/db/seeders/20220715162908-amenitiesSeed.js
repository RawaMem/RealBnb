'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Amenities', [
      {
        name: 'Washer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dryer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Air Conditioning',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Heating',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Wifi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'First aid kit',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hot tub',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'BBQ grill',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Self check-in',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Long term stays allowed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Free parking',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Exercise equipment',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pets allowed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Elevator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Coffee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Security cameras',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fire pit',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gym',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Private patio or balcony',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Streaming services',
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
    return queryInterface.bulkDelete('Amenities', null, {});
  }
};
