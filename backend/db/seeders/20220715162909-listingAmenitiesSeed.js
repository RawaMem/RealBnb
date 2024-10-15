'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'ListingAmenities'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    const listingAmenitiesData = [];

    for (let i = 1; i < 51; i++) { // i references listingId
      for (let j = 1; j < 21; j++) { // j references amenityId
        if ((i + j) % 2 == 0) { 
          const listingAmenityObj = {
            listingId: i,
            amenityId: j,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          listingAmenitiesData.push({...listingAmenityObj});
        }
      }
    }
    return queryInterface.bulkInsert(options, listingAmenitiesData, {});
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
