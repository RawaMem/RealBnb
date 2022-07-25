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

    const columnMap = {
      through: 'WishListListing',
      foreignKey: 'wishlistId',
      otherKey: 'listingId'
    }
    WishList.belongsToMany(models.Listing, { columnMap })

    WishList.belongsTo(models.User, { foreignKey: 'userId' });
    WishList.hasMany(models.WishListListing, { foreignKey: 'wishlistId', onDelete: 'cascade', hooks: 'true' });


  };
  return WishList;
};
