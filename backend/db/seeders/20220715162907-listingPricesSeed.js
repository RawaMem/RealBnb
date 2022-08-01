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
      userId: 1,
      pricePerDay: 199.99,
      startDate: "2022-9-1",
      endDate: "2022-10-1",
   },
    {
      listingId: 1,
      userId: 1,
      pricePerDay: 299.99,
      startDate: "2022-11-01",
      endDate: "2022-12-01",
   },
    {
      listingId: 2,
      userId: 2,
      pricePerDay: 99.99,
      startDate: "2022-09-05",
      endDate: "2022-10-10",
   },
    {
      listingId: 2,
      userId: 2,
      pricePerDay: 159.99,
      startDate: "2022-11-01",
      endDate: "2022-12-10",
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
