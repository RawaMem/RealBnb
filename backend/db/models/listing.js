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
    Listing.belongsTo(models.User, { foreignKey: 'ownerId' });
    Listing.hasMany(models.Review, { foreignKey: 'listingId'})
    Listing.belongsTo(models.Image, { foreignKey: 'previewImageId' });
    Listing.hasMany(models.Image, { foreignKey: 'listingId' });
    Listing.hasMany(models.ListingBrowseHistory, { foreignKey: 'listingId' });
    Listing.hasMany(models.ListingPrice, { foreignKey: 'listingId' });
    Listing.hasMany(models.Booking, { foreignKey: 'listingId' });


    const columnMap1 = {
      through: 'ListingCategory',
      foreignKey: 'listingId',
      otherKey: 'categoryId'
    }
    Listing.belongsToMany(models.Category, { columnMap1 })

    const columnMap2 = {
      through: 'ListingAmenity',
      foreignKey: 'listingId',
      otherKey: 'amenityId'
    }
    Listing.belongsToMany(models.Amenity, { columnMap2 })

    const columnMap3 = {
      through: 'WishListListing',
      foreignKey: 'listingId',
      otherKey: 'wishlistId'
    }
    Listing.belongsToMany(models.WishList, { columnMap3 })
  };
  return Listing;
};
