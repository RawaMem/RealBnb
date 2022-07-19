'use strict';
module.exports = (sequelize, DataTypes) => {
  const PasswordHistory = sequelize.define('PasswordHistory', {
    userId: DataTypes.INTEGER,
    previousHashedPassword: DataTypes.STRING
  }, {});
  PasswordHistory.associate = function(models) {
    // associations can be defined here
    PasswordHistory.belongsTo(models.User, { foreignKey: 'userId' });

  };
  return PasswordHistory;
};
