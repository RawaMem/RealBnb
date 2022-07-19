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

    WishList.hasMany(models.User, { foreignKey: 'userId' });


  };
  return WishList;
};
