'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'ListingPrices'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    declare an empty array


      write a function that will generate listingPrice objects
      push these into above array

      to generate dates the function should do the following
      new Date to generate get todays date
      use method .getTime() to get milliseconds since 1 jan 1970
      86400000 milliseconds per day
      multiply that milliseconds in day times how ever many days we want
      add this to the numebr we get from getTime()
      use new Date() and pass in the toal milliseconds to generate a new date
      use .toISOString() on an instance of the date object to get 2011-10-05T14:48:00.000Z
      split on the T and use index 0

      return queryInterface.bulkInsert('ListingPrice', ARRAY VARIABLE GOES HERE, {})

      */

      // const monthNumberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      // const todaysMonth = new Date().getMonth()
      // const cycleMultiplier = 1
      // const oneWeekInMilliseconds = 7 * oneDayInMilliseconds
      // let todaysDate = new Date()
      const listingPriceDataArray = [];
      const todaysDateInMilliseconds = new Date().getTime();
      const oneDayInMilliseconds =  86400000;
      const threeWeeksInMilliseconds = 21 * oneDayInMilliseconds;
      const fourWeeksInMilliseconds = 28 * oneDayInMilliseconds;
      const dateGapBetweenListings =  4 * oneDayInMilliseconds;
      let userId = 1;
      const pricePerDay = [199.99, 299.99, 169.87, 699.00, 499.89];
      let priceIdx = 0;
      let whileCycleNumber = 0;
      let forCycleNumber = 0;

      for (let i = 1; i < 51; i++) { // i references listing Id
        let priceListingObj = {
          listingId: i,
          userId: userId % 5,
          pricePerDay: pricePerDay[priceIdx % 5],
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const startDate = todaysDateInMilliseconds + (fourWeeksInMilliseconds * forCycleNumber % 12) + (dateGapBetweenListings * whileCycleNumber);
        const endDate = startDate + threeWeeksInMilliseconds;
        let formattedStartDate = new Date(startDate).toISOString().split('T')[0];
        let formattedEndDate = new Date(endDate).toISOString().split('T')[0];

        priceListingObj.startDate = formattedStartDate;
        priceListingObj.endDate = formattedEndDate;

        listingPriceDataArray.push({...priceListingObj});

        userId += 1;
        if (userId % 5 == 0) {
          userId += 1;
        }
        priceIdx += 1;
        whileCycleNumber += 1;
        forCycleNumber += 1;
      }
      return queryInterface.bulkInsert(options, listingPriceDataArray, {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete(options, null, {});
  }
};
