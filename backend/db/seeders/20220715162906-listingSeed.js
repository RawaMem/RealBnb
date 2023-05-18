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
   return queryInterface.bulkInsert(options, [
    {
      ownerId: '1',
      name: 'Hotel California',
      description: 'Welcome to the Hotel California, such a lovely place, such a lovely face, plenty of room at the Hotel California, any time of year, you can find it here.',
      serviceFee: 24.99,
      cleaningFee: 29.99,
      bedrooms: 5,
      beds: 6,
      baths: 3,
      maxGuests: 10,
      address: '9876 Wilshire Blvd',
      city: 'Beverly Hills',
      state: 'CA',
      zipCode: 90210,
      longitude: '-118.413030',
      latitude: '34.066350',
      createdAt: new Date(),
      updatedAt: new Date()
   },
    {
      ownerId: '2',
      name: 'Newport Beach House',
      description: 'Welcome to the Hotel California, such a lovely place, such a lovely face, plenty of room at the Hotel California, any time of year, you can find it here.',
      serviceFee: 39.99,
      cleaningFee: 34.99,
      bedrooms: 4,
      beds: 4,
      baths: 2,
      maxGuests: 7,
      address: '1722 E Oceanfront',
      city: 'Newport Beach',
      state: 'CA',
      zipCode: 92661,
      longitude: '-117.888030',
      latitude: '33.596670',
      createdAt: new Date(),
      updatedAt: new Date()
   },
    {
      ownerId: '3',
      name: 'Mouse House',
      description: 'Discover magic and fun at the Mouse House!',
      serviceFee: 199.99,
      cleaningFee: 99.99,
      bedrooms: 40,
      beds: 80,
      baths: 50,
      maxGuests: 80,
      address: '1313 Disneyland Dr',
      city: 'Anaheim',
      state: 'CA',
      zipCode: 92802,
      longitude: '-117.926399',
      latitude: '33.815395',
      createdAt: new Date(),
      updatedAt: new Date()
   },
    {
      ownerId: '4',
      name: "Vader's Chill Pad",
      description: 'Sometime you need to just get away from the state of the empire and chill in a building.',
      serviceFee: 49.00,
      cleaningFee: 59.00,
      bedrooms: 8,
      beds: 10,
      baths: 5,
      maxGuests: 12,
      address: '20 W 34th St.',
      city: 'New York',
      state: 'NY',
      zipCode: 10001,
      longitude: '-73.985352',
      latitude: '40.748718',
      createdAt: new Date(),
      updatedAt: new Date()
   },
    {
      ownerId: '5',
      name: "Orca's retreat",
      description: 'The best place to hang out with Orcas!',
      serviceFee: 30,
      cleaningFee: 40,
      bedrooms: 6,
      beds: 8,
      baths: 4,
      maxGuests: 12,
      address: '1483 Alaskan Way Pier 59',
      city: 'Seattle',
      state: 'WA',
      zipCode: 98101,
      longitude: '-122.342420',
      latitude: '47.607880',
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
   return queryInterface.bulkDelete(options, null, {});
  }
};
