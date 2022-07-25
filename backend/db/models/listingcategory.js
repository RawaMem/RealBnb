'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListingCategory = sequelize.define('ListingCategory', {
    categoryId: DataTypes.INTEGER,
    listingId: DataTypes.INTEGER
  }, {});
  ListingCategory.associate = function(models) {
    // associations can be defined here
    ListingCategory.belongsTo(models.Listing, { foreignKey: 'listingId'});

  };
  return ListingCategory;
};
