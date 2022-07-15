'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListingAmenity = sequelize.define('ListingAmenity', {
    amenityId: DataTypes.INTEGER,
    listingId: DataTypes.INTEGER
  }, {});
  ListingAmenity.associate = function(models) {
    // associations can be defined here
  };
  return ListingAmenity;
};