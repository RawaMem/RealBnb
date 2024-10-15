'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Bookings'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */

      const bookingsDataArray = []
      const todaysDateInMilliseconds = new Date().getTime()
      const oneDayInMilliseconds =  86400000
      const threeWeeksInMilliseconds = 21 * oneDayInMilliseconds
      const fourWeeksInMilliseconds = 28 * oneDayInMilliseconds
      const dateGapBetweenListings =  4 * oneDayInMilliseconds
      let avePricePerDay = 199.99
      let listingId = 1
      let userId = 1

      let whileCycleNumber = 0
      while (listingId < 6) {
        userId = 1

        for (let i = 0; i < 5; i++){
          if (listingId !== userId) {
            let forCycleNumber = i
            let bookingsObj = {
              listingId,
              userId,
              avePricePerDay,
              numOfGuests: 2,
              createdAt: new Date(),
              updatedAt: new Date(),
            }

            const startDate = todaysDateInMilliseconds + (fourWeeksInMilliseconds * forCycleNumber) + (dateGapBetweenListings * whileCycleNumber) + (oneDayInMilliseconds * Math.floor(Math.random() * 3 + 1))
            const endDate = startDate + (oneDayInMilliseconds * Math.floor(Math.random() * 3 + 1))
            let formattedStartDate = new Date(startDate).toISOString().split('T')[0]
            let formattedEndDate = new Date(endDate).toISOString().split('T')[0]
            bookingsObj.startDate = formattedStartDate
            bookingsObj.endDate = formattedEndDate
            let numOfDays = Math.floor((endDate - startDate)/oneDayInMilliseconds)
            bookingsObj.totalCost = avePricePerDay * numOfDays
            bookingsDataArray.push(bookingsObj)
          }
          userId++

        }
        listingId++
        whileCycleNumber++
        avePricePerDay += 25
      }

      return queryInterface.bulkInsert(options, bookingsDataArray, {})
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
