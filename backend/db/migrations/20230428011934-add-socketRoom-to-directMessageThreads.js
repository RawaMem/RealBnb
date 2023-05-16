'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('DirectMessageThreads', 'socketRoom', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('DirectMessageThreads', 'socketRoom');
    },
  };
  