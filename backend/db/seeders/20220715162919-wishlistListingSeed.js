"use strict";

const options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

options.tableName = "WishListListings";

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
		return queryInterface.bulkInsert(
			options,
			[
				{
					wishlistId: 1,
					listingId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					wishlistId: 1,
					listingId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					wishlistId: 2,
					listingId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					wishlistId: 2,
					listingId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					wishlistId: 3,
					listingId: 5,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
		return queryInterface.bulkDelete(options, null, {});
	},
};
