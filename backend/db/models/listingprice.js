'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListingPrice = sequelize.define('ListingPrice', {
    listingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pricePerDay: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {});
  ListingPrice.associate = function(models) {
    // associations can be defined here
    ListingPrice.belongsTo(models.Listing, { foreignKey: 'listingId' });
    ListingPrice.belongsTo(models.User, { foreignKey: 'userId' });

  };
  return ListingPrice;
};
