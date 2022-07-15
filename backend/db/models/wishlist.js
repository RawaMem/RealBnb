'use strict';
module.exports = (sequelize, DataTypes) => {
  const WishList = sequelize.define('WishList', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE,
    adultGuests: DataTypes.INTEGER,
    childGuests: DataTypes.INTEGER,
    infantGuests: DataTypes.INTEGER,
    petGuests: DataTypes.INTEGER
  }, {});
  WishList.associate = function(models) {
    // associations can be defined here
  };
  return WishList;
};