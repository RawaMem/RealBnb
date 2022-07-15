'use strict';
module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('Listing', {
    ownerId: DataTypes.INTEGER,
    previewImageId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    serviceFee: DataTypes.DECIMAL,
    serviceFee: DataTypes.DECIMAL,
    cleaningFee: DataTypes.DECIMAL,
    numRooms: DataTypes.INTEGER,
    maxGuests: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    longitude: DataTypes.DECIMAL,
    latitude: DataTypes.DECIMAL
  }, {});
  Listing.associate = function(models) {
    // associations can be defined here
  };
  return Listing;
};