'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo',
        lastName: 'User',
        host: true,
        superHost: true,
        identityVerified: true,
        aboutMe: 'I am the ultimate user. I am the original. Numero Uno.',
        duringStay: 'You better be clean to my place!'
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: 'Fake',
        lastName: 'User',
        host: true,
        superHost: false,
        identityVerified: true,
        aboutMe: 'I am a fake. I am just a regular host.',
        duringStay: 'I apologize ahead of time if you hear me snore.'
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: 'Fake',
        lastName: 'User',
        host: false,
        superHost: false,
        identityVerified: false,
        aboutMe: 'Who am I?',
        duringStay: 'Do whatever!'
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
