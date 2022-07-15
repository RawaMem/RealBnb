'use strict';
module.exports = (sequelize, DataTypes) => {
  const DirectMessageThread = sequelize.define('DirectMessageThread', {
    hostId: DataTypes.INTEGER,
    guestId: DataTypes.INTEGER
  }, {});
  DirectMessageThread.associate = function(models) {
    // associations can be defined here
  };
  return DirectMessageThread;
};