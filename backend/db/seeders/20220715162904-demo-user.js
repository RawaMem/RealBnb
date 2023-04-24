'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Users'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(options, [
      {
        username: 'Demo-lition',
        firstName: 'Demo',
        lastName: 'Lition',
        email: 'demo@user.io',
        host: true,
        superHost: true,
        identityVerified: true,
        online: false,
        aboutMe: 'I strive to the the best demo user the guests who visit my site and home.',
        duringStay: 'We are available 24/7 to accomodate your needs',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo',
        lastName: 'User',
        host: true,
        superHost: true,
        identityVerified: true,
        aboutMe: 'I am the ultimate user. I am the original. Numero Uno.',
        duringStay: 'You better be clean to my place!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'MacBookProEnergy',
        firstName: 'Daniel',
        lastName: 'Flores',
        email: faker.internet.email(),
        host: true,
        superHost: true,
        identityVerified: false,
        online: false,
        aboutMe: 'Using one monitor allows me to see everything without moving my eyes which is my super power',
        duringStay: 'Our property manager company, MBP Energy, is local and has staff available at all times with one monitor each.',
        hashedPassword: bcrypt.hashSync('password'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'AlwaysDebugging',
        firstName: 'Sherry',
        lastName: 'Yu',
        email: faker.internet.email(),
        host: true,
        superHost: false,
        identityVerified: false,
        online: false,
        aboutMe: 'My wide screen monitor allows me to open 10 windows at the same time so I never miss any messages.',
        duringStay: 'I will make sure that I am monitoring you on my widescreen monitor at all times.',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'TheyCallMeJenn',
        firstName: 'Zhen',
        lastName: 'Yu',
        email: faker.internet.email(),
        host: true,
        superHost: false,
        identityVerified: false,
        online: false,
        aboutMe: 'They call me Jenn. They have always called me Jenn. Because I asked them to call me Jenn',
        duringStay: 'During your stay I will make sure that you call me Jenn.',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: 'Fake',
        lastName: 'User',
        host: true,
        superHost: false,
        identityVerified: true,
        aboutMe: 'I am a fake. I am just a regular host.',
        duringStay: 'I apologize ahead of time if you hear me snore.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Mod2Pro',
        firstName: 'Alex',
        lastName: 'Pezatti',
        email: faker.internet.email(),
        host: true,
        superHost: false,
        identityVerified: false,
        online: false,
        aboutMe: 'Data structures and algorithms are like playing with baby toys to me.',
        duringStay: 'Please do not hesitate to contact me for any data structure and algorithm questions.',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: 'Fake',
        lastName: 'User',
        host: false,
        superHost: false,
        identityVerified: false,
        aboutMe: 'Who am I?',
        duringStay: 'Do whatever!',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
