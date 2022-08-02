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
      name: 'Beach',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      name: 'Skyscrapers',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      name: 'Iconic cities',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      name: 'Amazing views',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      name: 'Castles',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      name: 'Wildlife',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      name: 'Lakefront',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      name: 'National parks',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      name: 'Cabins',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      name: 'Islands',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      name: 'Tiny homes',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      name: 'Camping',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      name: 'Design',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      name: 'Amazing pools',
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
   return queryInterface.bulkDelete('Categories', null, {});
  }
};
