'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Listings', [
    {
      ownerId: '1',
      previewImageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/1c/7d/2c/b5/hotel-california.jpg',
      name: 'Hotel California',
      description: 'Welcome to the Hotel California, such a lovely place, such a lovely face, plenty of room at the Hotel California, any time of year, you can find it here.',
      serviceFee: 24.99,
      cleaningFee: 29.99,
      numRooms: 5,
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
      previewImageUrl: 'https://beachviewrealty.com/wp-content/uploads/2022/03/CollectionsRecentlyAdded-min.jpg',
      name: 'Newport Beach House',
      description: 'Welcome to the Hotel California, such a lovely place, such a lovely face, plenty of room at the Hotel California, any time of year, you can find it here.',
      serviceFee: 39.99,
      cleaningFee: 34.99,
      numRooms: 4,
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
      previewImageUrl: 'https://i.pinimg.com/originals/1e/d8/81/1ed8818e3618f1cbe1b925a5c9f84431.jpg',
      name: 'Mouse House',
      description: 'Discover magic and fun at the Mouse House!',
      serviceFee: 199.99,
      cleaningFee: 99.99,
      numRooms: 40,
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
      previewImageUrl: 'https://media.nbcnewyork.com/2021/04/GettyImages-1310356958.jpg?quality=85&strip=all&resize=1200%2C675',
      name: "Vader's Chill Pad",
      description: 'Sometime you need to just get away from the state of the empire and chill in a building.',
      serviceFee: 49.00,
      cleaningFee: 59.00,
      numRooms: 8,
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
      previewImageUrl: 'https://images.seattletimes.com/wp-content/uploads/2020/01/CANYON_INTERIOR.jpg?d=780x533',
      name: "Orca's retreat",
      description: 'The best place to hang out with Orcas!',
      serviceFee: 30,
      cleaningFee: 40,
      numRooms: 6,
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
   return queryInterface.bulkDelete('Listings', null, {});
  }
};
