'use strict';

const crypto = require('crypto')

module.exports = (sequelize, DataTypes) => {
  const DirectMessageThread = sequelize.define('DirectMessageThread', {
    hostId: DataTypes.INTEGER,
    guestId: DataTypes.INTEGER,
    socketRoom: DataTypes.STRING
  }, {
    hooks: {
        afterCreate: async (thread, options) => {
            const hash = crypto.createHash('sha256');
            hash.update(String(thread.id));
            await thread.update({ socketRoom: hash.digest('hex').substring(0, 20) });
        }
    }
  });
  DirectMessageThread.associate = function(models) {
    // associations can be defined here
    DirectMessageThread.belongsTo(models.User, { foreignKey: 'hostId' });
    DirectMessageThread.belongsTo(models.User, { foreignKey: 'guestId' });
    DirectMessageThread.hasMany(models.DirectMessage, { foreignKey: 'directMessageThreadId' });

  };
  return DirectMessageThread;
};
