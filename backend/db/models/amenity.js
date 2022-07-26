'use strict';
module.exports = (sequelize, DataTypes) => {
  const Amenity = sequelize.define('Amenity', {
    name: DataTypes.STRING,
    iconUrl: DataTypes.STRING
  }, {});
  Amenity.associate = function(models) {
    // associations can be defined here
    const columnMap = {
      through: 'ListingAmenity',
      foreignKey: 'amenityId',
      otherKey: 'listingId'
    }
    Amenity.belongsToMany(models.Listing, columnMap)

  };
  return Amenity;
};
