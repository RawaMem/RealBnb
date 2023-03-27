'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListingCategory = sequelize.define('ListingCategory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories"
      },
      allowNull: false,
      onDelete: 'CASCADE'
    }, 
    listingId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Listings"
      },
      allowNull: false,
      onDelete: "CASCADE"
    },
  }, {});
  ListingCategory.associate = function(models) {
    // associations can be defined here
    ListingCategory.belongsTo(models.Listing, { foreignKey: 'listingId'});
    // ListingCategory.belongsTo(models.Category), { foreignKey: 'categoryId'};
  };
  return ListingCategory;
};
