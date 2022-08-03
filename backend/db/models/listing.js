'use strict';
module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('Listing', {
    ownerId: DataTypes.INTEGER,
    previewImageUrl: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    serviceFee: DataTypes.DECIMAL,
    cleaningFee: DataTypes.DECIMAL,
    bedrooms: DataTypes.INTEGER,
    beds: DataTypes.INTEGER,
    baths: DataTypes.INTEGER,
    maxGuests: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    longitude: DataTypes.DECIMAL,
    latitude: DataTypes.DECIMAL
  }, {});
  Listing.associate = function(models) {
    //need to figure out onCascade delete for listings and images also with previewimage, might lead to circular delete, possible solition is make listingId nullable on image and for preview image leave it blank
    Listing.belongsTo(models.User, { foreignKey: 'ownerId' });
    Listing.hasMany(models.Review, { foreignKey: 'listingId', onDelete: 'cascade', hooks: 'true'})
    //docs say to use singular for belongsTo aliases and plural for hasMany aliases
    Listing.hasMany(models.Image, { foreignKey: 'listingId', onDelete: 'cascade', hooks: 'true' }); //has alias
    Listing.hasMany(models.ListingBrowseHistory, { foreignKey: 'listingId', onDelete: 'cascade', hooks: 'true' });
    Listing.hasMany(models.ListingPrice, { foreignKey: 'listingId', onDelete: 'cascade', hooks: 'true' });
    Listing.hasMany(models.Booking, { foreignKey: 'listingId', onDelete: 'cascade', hooks: 'true' });
    Listing.hasMany(models.WishListListing, { foreignKey: 'listingId', onDelete: 'cascade', hooks: 'true' });
    Listing.hasMany(models.ListingCategory, { foreignKey: 'listingId', onDelete: 'cascade', hooks: 'true' });
    Listing.hasMany(models.ListingAmenity, { foreignKey: 'listingId', onDelete: 'cascade', hooks: 'true' });


    const columnMap1 = {
      through: 'ListingCategory',
      foreignKey: 'listingId',
      otherKey: 'categoryId'
    }
    Listing.belongsToMany(models.Category, columnMap1)

    const columnMap2 = {
      through: 'ListingAmenity',
      foreignKey: 'listingId',
      otherKey: 'amenityId'
    }
    Listing.belongsToMany(models.Amenity, columnMap2)

    const columnMap3 = {
      through: 'WishListListing',
      foreignKey: 'listingId',
      otherKey: 'wishlistId'
    }
    Listing.belongsToMany(models.WishList, columnMap3)
  };
  return Listing;
};
