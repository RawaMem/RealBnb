'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSetting = sequelize.define('UserSetting', {
    userId: DataTypes.INTEGER,
    theme: DataTypes.STRING,
    recoveryQuestion1: DataTypes.STRING,
    hashedAnswer1: DataTypes.STRING,
    recoveryQuestion2: DataTypes.STRING,
    hashedAnswer2: DataTypes.STRING,
    recoveryQuestion3: DataTypes.STRING,
    hashedAnswer3: DataTypes.STRING
  }, {});
  UserSetting.associate = function(models) {
    // associations can be defined here
  };
  return UserSetting;
};