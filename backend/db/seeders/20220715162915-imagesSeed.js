'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Images'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert(options, [
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
   },
   {
        userId: 3,
        listingId: 3,
        url: 'https://i.pinimg.com/originals/1e/d8/81/1ed8818e3618f1cbe1b925a5c9f84431.jpg',
        description: 'Discover magic and fun at the Mouse House!',
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 3,
        listingId: 3,
        url: 'https://astrogram.s3.us-east-2.amazonaws.com/01b63aa8baab4f8785102230612b04aa.jpg',
        description: 'The Hotel California is the best',
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 3,
        listingId: 3,
        url: 'https://astrogram.s3.us-east-2.amazonaws.com/0270ce3c438644db876c44265f5d4f4c.jpg',
        description: 'The Hotel California is the best',
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 3,
        listingId: 3,
        url: 'https://astrogram.s3.us-east-2.amazonaws.com/070ecc196dcf48d8a77c10b60f866662.jpg',
        description: 'The Hotel California is the best',
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 3,
        listingId: 3,
        url: 'https://astrogram.s3.us-east-2.amazonaws.com/134037fdf8e842f69f6f1dd67097e4a9.jpg',
        description: 'The Hotel California is the best',
        createdAt: new Date(),
        updatedAt: new Date()
   },
   {
        userId: 5,
        listingId: 5,
        url: 'https://images.seattletimes.com/wp-content/uploads/2020/01/CANYON_INTERIOR.jpg?d=780x533',
        description: 'Discover magic and fun at the Mouse House!',
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 5,
        listingId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20848638/original/6779e11f-a4d3-4aff-b4a7-fa506bd290dc.jpeg',
        description: 'The Hotel California is the best',
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 5,
        listingId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20848638/original/eebe6708-4130-448f-91df-3cf8b0a1bcdc.jpeg',
        description: 'The Hotel California is the best',
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 5,
        listingId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20848638/original/dc548c4f-dd61-4ff3-b4bf-793ca76035bd.jpeg',
        description: 'The Hotel California is the best',
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 5,
        listingId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20848638/original/9ac5bb19-4324-4956-8ced-0369ffcf8aa9.jpeg',
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
   return queryInterface.bulkDelete(options, null, {});
  }
};
