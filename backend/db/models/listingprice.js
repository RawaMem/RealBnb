'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListingPrice = sequelize.define('ListingPrice', {
    listingId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    pricePerDay: DataTypes.DECIMAL,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {});
  ListingPrice.associate = function(models) {
    // associations can be defined here
    ListingPrice.belongsTo(models.Listing, { foreignKey: 'listingId' });
    ListingPrice.belongsTo(models.User, { foreignKey: 'userId' });

  };
  return ListingPrice;
};
