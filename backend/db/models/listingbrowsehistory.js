'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListingBrowseHistory = sequelize.define('ListingBrowseHistory', {
    userId: DataTypes.INTEGER,
    listingId: DataTypes.INTEGER
  }, {});
  ListingBrowseHistory.associate = function(models) {
    // associations can be defined here
  };
  return ListingBrowseHistory;
};