'use strict';
module.exports = (sequelize, DataTypes) => {
  const DirectMessageThread = sequelize.define('DirectMessageThread', {
    hostId: DataTypes.INTEGER,
    guestId: DataTypes.INTEGER
  }, {});
  DirectMessageThread.associate = function(models) {
    // associations can be defined here
    DirectMessageThread.belongsTo(models.User, { foreignKey: 'hostId' });
    DirectMessageThread.belongsTo(models.User, { foreignKey: 'guestId' });
    DirectMessageThread.hasMany(models.DirectMessage, { foreignKey: 'directMessageThreadId' });

  };
  return DirectMessageThread;
};
