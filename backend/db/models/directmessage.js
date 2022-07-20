'use strict';
module.exports = (sequelize, DataTypes) => {
  const DirectMessage = sequelize.define('DirectMessage', {
    senderId: DataTypes.INTEGER,
    directMessageThreadId: DataTypes.INTEGER,
    notified: DataTypes.BOOLEAN,
    content: DataTypes.STRING
  }, {});
  DirectMessage.associate = function(models) {
    // associations can be defined here
    DirectMessage.belongsTo(models.User, { foreignKey: 'senderId' });
    DirectMessage.belongsTo(models.DirectMessageThread, { foreignKey: 'directMessageThreadId' });

  };
  return DirectMessage;
};
