'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListingAmenity = sequelize.define('ListingAmenity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    amenityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    listingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  ListingAmenity.associate = function(models) {
    // associations can be defined here
    ListingAmenity.belongsTo(models.Listing, { foreignKey: 'listingId'});
    ListingAmenity.belongsTo(models.Amenity, { foreignKey: 'amenityId'});
  };
  return ListingAmenity;
};
