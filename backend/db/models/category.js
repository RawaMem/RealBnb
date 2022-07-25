'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    iconUrl: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    const columnMap = {
      through: 'ListingCategory',
      foreignKey: 'categoryId',
      otherKey: 'listingId'
    }
    Category.belongsToMany(models.Listing, { columnMap })



  };
  return Category;
};
