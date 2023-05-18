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
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/1c/7d/2c/b5/hotel-california.jpg',
        preview: true,
        description: 'The Hotel California is the best',
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 1,
        listingId: 1,
        url: 'https://visitpalmsprings.com/wp-content/uploads/2020/06/70425524-02-Hotel-California-Palm-Springs-California-02-original-750x570.jpg',
        preview: false,
        description: 'The Hotel California is the best',
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 1,
        listingId: 1,
        url: 'https://visitpalmsprings.com/wp-content/uploads/2020/06/127209098-750x570.jpg.webp',
        description: 'The Hotel California is the best',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 1,
        listingId: 1,
        url: 'https://visitpalmsprings.com/wp-content/uploads/2020/06/f4498b382a621af994667b0ee605d384-750x570.jpg.webp',
        description: 'The Hotel California is the best',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 1,
        listingId: 1,
        url: 'https://visitpalmsprings.com/wp-content/uploads/2020/06/HotelCA_HM_pic4-750x570.jpg.webp',
        description: 'The Hotel California is the best',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 1,
        listingId: 1,
        url: 'https://visitpalmsprings.com/wp-content/uploads/2020/06/81273174-750x570.jpg.webp',
        description: 'The Hotel California is the best',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 2,
        listingId: 2,
        url: 'https://beachviewrealty.com/wp-content/uploads/2022/03/CollectionsRecentlyAdded-min.jpg',
        description: 'Newport Beach House',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 2,
        listingId: 2,
        url: 'https://a0.muscache.com/im/pictures/70440308/6404ba00_original.jpg?im_w=1200',
        description: 'Newport Beach House',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 2,
        listingId: 2,
        url: 'https://a0.muscache.com/im/pictures/70440294/8c0c4d76_original.jpg?im_w=720',
        description: 'Newport Beach House',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 2,
        listingId: 2,
        url: 'https://a0.muscache.com/im/pictures/70440455/a52b60ae_original.jpg?im_w=720',
        description: 'Newport Beach House',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 2,
        listingId: 2,
        url: 'https://a0.muscache.com/im/pictures/70441605/8bd306e3_original.jpg?im_w=720',
        description: 'Newport Beach House',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 3,
        listingId: 3,
        url: 'https://i.pinimg.com/originals/1e/d8/81/1ed8818e3618f1cbe1b925a5c9f84431.jpg',
        description: 'Mouse House',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 3,
        listingId: 3,
        url: 'https://i.pinimg.com/originals/1e/d8/81/1ed8818e3618f1cbe1b925a5c9f84431.jpg',
        description: 'Mouse House',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 3,
        listingId: 3,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-629652398313106706/original/0620e8a0-0b5a-4991-b5e2-5277b8cc6a13.jpg?im_w=1200',
        description: 'Mouse House',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 3,
        listingId: 3,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-629652398313106706/original/d86c074b-ca6c-4418-90b9-91f27ed64914.jpg?im_w=720',
        description: 'Mouse House',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 3,
        listingId: 3,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-629652398313106706/original/fe227dc2-52b8-46e0-88e0-a6b08960d7da.jpg?im_w=720',
        description: 'Mouse House',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 3,
        listingId: 3,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-629652398313106706/original/2482d766-6f6e-48b5-a0f3-3bc5b9d65f0b.jpg?im_w=720',
        description: 'Mouse House',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 4,
        listingId: 4,
        url: 'https://media.nbcnewyork.com/2021/04/GettyImages-1310356958.jpg?quality=85&strip=all&resize=1200%2C675',
        description: "Vader's Chill Pad",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 4,
        listingId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-29919648/original/38def551-c7d8-4731-8d86-ff57f7f10bc2.jpeg?im_w=1200',
        description: "Vader's Chill Pad",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 4,
        listingId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-29919648/original/cb826444-a7ce-494a-8e82-7bb5aae63b6e.jpeg?im_w=720',
        description: "Vader's Chill Pad",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 4,
        listingId: 4,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-29919648/original/27da4890-3e28-4505-8642-53b4119cc5be.jpg?im_w=720',
        description: "Vader's Chill Pad",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 4,
        listingId: 4,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-29919648/original/b00fc02d-40fb-4930-a39e-9fa266fb57d0.jpg?im_w=720',
        description: "Vader's Chill Pad",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 5,
        listingId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-331330/original/b5c4d07e-a39b-45da-9482-9c46175bab98.jpeg?im_w=720',
        description: "Orca's retreat",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 5,
        listingId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-331330/original/629cfe98-225b-46e2-b36c-4fa2c49dc7d7.jpeg?im_w=1200',
        description: "Orca's retreat",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 5,
        listingId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-331330/original/e0efdb50-2bc4-4ba8-9b94-eca116b8b552.jpeg?im_w=720',
        description: "Orca's retreat",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 5,
        listingId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-331330/original/6ff51e62-f8a2-4061-ac17-7ae099cc60b5.jpeg?im_w=720',
        description: "Orca's retreat",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
   },
    {
        userId: 5,
        listingId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-331330/original/629cfe98-225b-46e2-b36c-4fa2c49dc7d7.jpeg?im_w=1200',
        description: "Orca's retreat",
        preview: false,
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
