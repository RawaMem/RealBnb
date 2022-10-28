'use strict';

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
      const listingPriceDataArray = []
      const todaysDateInMilliseconds = new Date().getTime()
      const oneDayInMilliseconds =  86400000
      const threeWeeksInMilliseconds = 21 * oneDayInMilliseconds
      const fourWeeksInMilliseconds = 28 * oneDayInMilliseconds
      const dateGapBetweenListings =  4 * oneDayInMilliseconds
      let listingId = 1
      let userId = 1
      let pricePerDay = 199.99

      let whileCycleNumber = 0
      while (userId < 6) {

        for (let i = 0; i < 12; i++) {
          let forCycleNumber = i
          let priceListingObj = {
            listingId,
            userId,
            pricePerDay,
            createdAt: new Date(),
            updatedAt: new Date()
          }

          const startDate = todaysDateInMilliseconds + (fourWeeksInMilliseconds * forCycleNumber) + (dateGapBetweenListings * whileCycleNumber)
          const endDate = startDate + threeWeeksInMilliseconds
          let formattedStartDate = new Date(startDate).toISOString().split('T')[0]
          let formattedEndDate = new Date(endDate).toISOString().split('T')[0]
          priceListingObj.startDate = formattedStartDate
          priceListingObj.endDate = formattedEndDate

          listingPriceDataArray.push(priceListingObj)
        }
        listingId++
        userId++
        whileCycleNumber++
        pricePerDay += 25
      }
      // console.log('THIS IS THE PRICE LISTING DATA ARRAY', listingPriceDataArray)
      return queryInterface.bulkInsert('ListingPrices', listingPriceDataArray, {})


   return queryInterface.bulkInsert('ListingPrices', [
    {
      listingId: 1,
      userId: 1,
      pricePerDay: 199.99,
      startDate: "2022-9-1",
      endDate: "2022-10-1",
      createdAt: new Date(),
      updatedAt: new Date()
   },
    {
      listingId: 1,
      userId: 1,
      pricePerDay: 299.99,
      startDate: "2022-11-01",
      endDate: "2022-12-01",
      createdAt: new Date(),
      updatedAt: new Date()
   },
    {
      listingId: 2,
      userId: 2,
      pricePerDay: 99.99,
      startDate: "2022-09-05",
      endDate: "2022-10-10",
      createdAt: new Date(),
      updatedAt: new Date()
   },
    {
      listingId: 2,
      userId: 2,
      pricePerDay: 159.99,
      startDate: "2022-11-01",
      endDate: "2022-12-10",
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
    listingId: 3,
    userId: 3,
    pricePerDay: 220,
    startDate: "2022-11-01",
    endDate: "2022-12-01",
    createdAt: new Date(),
    updatedAt: new Date()
 },
  {
    listingId: 4,
    userId: 4,
    pricePerDay: 400,
    startDate: "2022-09-05",
    endDate: "2022-10-10",
    createdAt: new Date(),
    updatedAt: new Date()
 },
  {
    listingId: 5,
    userId: 5,
    pricePerDay: 160,
    startDate: "2022-11-01",
    endDate: "2022-12-10",
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
   return queryInterface.bulkDelete('ListingPrices', null, {});
  }
};
