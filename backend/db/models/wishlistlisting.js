'use strict';
module.exports = (sequelize, DataTypes) => {
  const WishListListing = sequelize.define('WishListListing', {
    wishlistId: DataTypes.INTEGER,
    listingId: DataTypes.INTEGER
  }, {});
  WishListListing.associate = function(models) {
    // associations can be defined here
    WishListListing.belongsTo(models.Listing, { foreignKey: 'listingId'});
    WishListListing.belongsTo(models.WishList, { foreignKey: 'wishlistId'});
  };
  return WishListListing;
};
