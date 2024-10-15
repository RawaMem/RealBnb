'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Listings'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    const listingData = [];
    const bedrooms = [2,3,4,5,6];
    const beds = [2,3,4,5,6];
    const baths =  [2,3,4,5,6];
    const maxGuests = [2,4,6,8,10];
    const addresses = [
      '9876 Wilshire Blvd',
      '1722 E Oceanfront',
      '1313 Disneyland Dr',
      '20 W 34th St.',
      '1483 Alaskan Way Pier 59'
    ];
    const cities = ["Beverly Hills", "Newport Beach", "Anaheim", "New York", "Seattle"];
    const state = ["CA", "CA", "CA", "NY", "WA"];
    const zipcodes = ["90210", "92661", "92802", "10001", "98101"];
    const longitudes = [-118.413030, -117.888030, -117.926399, -73.985352, -122.342420];
    const latitudes = [34.066350, 33.596670, 33.815395, 40.748718, 47.607880];
    let userId = 1;
    let curIdx = 0;
    for (let i = 1; i < 51; i++) {
      const listingObj = {
        ownerId: userId % 5,
        name: `StayScape ${i}`,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        serviceFee: 24.99,
        cleaningFee: 29.99,
        bedrooms: bedrooms[curIdx % 5],
        beds: beds[curIdx % 5],
        baths: baths[curIdx % 5],
        maxGuests: maxGuests[curIdx % 5],
        address: addresses[curIdx % 5],
        city: cities[curIdx % 5],
        state: state[curIdx % 5],
        zipCode: zipcodes[curIdx % 5],
        longitude: longitudes[curIdx % 5],
        latitude: latitudes[curIdx % 5],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      listingData.push({...listingObj});
      curIdx += 1;
      userId += 1;
      if (userId % 5 == 0) {
        userId += 1;
      }
    }

    return queryInterface.bulkInsert(options, listingData, {});
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
