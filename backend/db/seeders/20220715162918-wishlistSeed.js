"use strict";

const options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

options.tableName = "WishLists";

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
					userId: 1,
					name: "Texas",
					checkIn: "2025-05-10T00:00:00.000Z",
					checkOut: "2025-06-10T00:00:00.000Z",
					adultGuests: 10,
					childGuests: 5,
					infantGuests: 1,
					petGuests: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					userId: 1,
					name: "Arizona",
					checkIn: "2025-07-10T00:00:00.000Z",
					checkOut: "2025-08-10T00:00:00.000Z",
					adultGuests: 2,
					childGuests: 5,
					infantGuests: 1,
					petGuests: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					userId: 1,
					name: "El Salvador",
					checkIn: "2025-09-10T00:00:00.000Z",
					checkOut: "2025-10-10T00:00:00.000Z",
					adultGuests: 5,
					childGuests: 10,
					infantGuests: 1,
					petGuests: 1,
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
