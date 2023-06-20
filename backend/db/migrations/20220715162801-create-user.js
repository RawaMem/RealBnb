"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true,
      },
      host: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      superHost: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      identityVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      online: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      aboutMe: {
        type: Sequelize.STRING(2000),
      },
      duringStay: {
        type: Sequelize.STRING(2000),
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    }, options);
  },
  down: (queryInterface, Sequelize) => {
    options.tableName ='Users'
    return queryInterface.dropTable(options);
  },
};
