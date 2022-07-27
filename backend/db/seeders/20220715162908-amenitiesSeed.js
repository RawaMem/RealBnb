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
        name: 'Beach'
      },
      {
        name: 'Skyscrapers'
      },
      {
        name: 'Iconic cities'
      },
      {
        name: 'Amazing views'
      },
      {
        name: 'Castles'
      },
      {
        name: 'Wildlife'
      }
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
