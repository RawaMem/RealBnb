'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Bookings', [
        {
          userId: 1,
          listingId: 2,
          totalCost:399.96,
          avePricePerDay:99.99,
          paymentConfirmed: true,
          startDate: "2022-09-10",
          endDate:"2022-09-14",
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
          userId: 1,
          listingId: 2,
          totalCost:479.97,
          avePricePerDay:159.99,
          paymentConfirmed: true,
          startDate: "2022-11-06",
          endDate:"2022-11-09",
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
      return queryInterface.bulkDelete('Bookings', null, {});
  }
};
