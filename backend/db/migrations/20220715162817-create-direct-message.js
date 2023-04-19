'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DirectMessages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      senderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      directMessageThreadId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'DirectMessageThreads' }
      },
      notified: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, options);
  },
  down: (queryInterface, Sequelize) => {
    options.tableName ='DirectMessages'

    return queryInterface.dropTable(options);
  }
};
