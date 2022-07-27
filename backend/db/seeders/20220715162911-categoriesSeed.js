'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Categories', [
      {
        name: 'Washer'
      },
      {
        name: 'Dryer'
      },
      {
        name: 'Air Conditioning'
      },
      {
        name: 'Heating'
      },
      {
        name: 'Wifi'
      },
      {
        name: 'First aid kit'
      },
      {
        name: 'Hot tub'
      },
      {
        name: 'BBQ grill'
      },
      {
        name: 'Self check-in'
      },
      {
        name: 'Long term stays allowed'
      },
      {
        name: 'Free parking'
      },
      {
        name: 'Exercise equipment'
      },
      {
        name: 'Pets allowed'
      },
      {
        name: 'Elevator'
      },
      {
        name: 'Coffee'
      },
      {
        name: 'Security cameras'
      },
      {
        name: 'Fire pit'
      },
      {
        name: 'Gym'
      },
      {
        name: 'Private patio or balcony'
      },
      {
        name: 'Streaming services'
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Categories', null, {});
  }
};
