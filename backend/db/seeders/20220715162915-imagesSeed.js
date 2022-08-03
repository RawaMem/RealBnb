'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Images', [
    {
        userId: 1,
        listingId: 1,
        url: 'https://visitpalmsprings.com/wp-content/uploads/2020/06/70425524-02-Hotel-California-Palm-Springs-California-02-original-750x570.jpg',
        description: 'The Hotel California is the best',
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 1,
        listingId: 1,
        url: 'https://visitpalmsprings.com/wp-content/uploads/2020/06/127209098-750x570.jpg.webp',
        description: 'The Hotel California is the best',
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 1,
        listingId: 1,
        url: 'https://visitpalmsprings.com/wp-content/uploads/2020/06/f4498b382a621af994667b0ee605d384-750x570.jpg.webp',
        description: 'The Hotel California is the best',
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 1,
        listingId: 1,
        url: 'https://visitpalmsprings.com/wp-content/uploads/2020/06/HotelCA_HM_pic4-750x570.jpg.webp',
        description: 'The Hotel California is the best',
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 1,
        listingId: 1,
        url: 'https://visitpalmsprings.com/wp-content/uploads/2020/06/81273174-750x570.jpg.webp',
        description: 'The Hotel California is the best',
        createdAt: new Date(),
        updatedAt: new Date()
   }

], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Images', null, {});
  }
};
