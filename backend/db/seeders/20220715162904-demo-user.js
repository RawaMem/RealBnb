'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Demo-lition',
        firstName: 'Demo',
        lastName: 'Lition',
        email: 'demo@user.io',
        host: true,
        superHost: true,
        identityVerified: true,
        aboutMe: 'I strive to the the best demo user the guests who visit my site and home.',
        duringStay: 'We are available 24/7 to accomodate your needs',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'MacBookProEnergy',
        firstName: 'Daniel',
        lastName: 'Flores',
        email: faker.internet.email(),
        host: true,
        superHost: true,
        identityVerified: false,
        aboutMe: 'Using one monitor allows me to see everything without moving my eyes which is my super power',
        duringStay: 'Our property manager company, MBP Energy, is local and has staff available at all times with one monitor each.',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        username: 'AlwaysDebugging',
        firstName: 'Sherry',
        lastName: 'Yu',
        email: faker.internet.email(),
        host: true,
        superHost: false,
        identityVerified: false,
        aboutMe: 'My wide screen monitor allows me to open 10 windows at the same time so I never miss any messages.',
        duringStay: 'I will make sure that I am monitoring you on my widescreen monitor at all times.',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        username: 'TheyCallMeJenn',
        firstName: 'Zhen',
        lastName: 'Yu',
        email: faker.internet.email(),
        host: true,
        superHost: false,
        identityVerified: false,
        aboutMe: 'They call me Jenn. They have always called me Jenn. Because I asked them to call me Jenn',
        duringStay: 'During your stay I will make sure that you call me Jenn.',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        username: 'Mod2Pro',
        firstName: 'Alex',
        lastName: 'Pezatti',
        email: faker.internet.email(),
        host: true,
        superHost: false,
        identityVerified: false,
        aboutMe: 'Data structures and algorithms are like playing with baby toys to me.',
        duringStay: 'Please do not hesitate to contact me for any data structure and algorithm questions.',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
