'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    authorId: DataTypes.INTEGER,
    listingId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    starRating: DataTypes.INTEGER,
    cleanliness: DataTypes.INTEGER,
    communication: DataTypes.INTEGER,
    checkIn: DataTypes.INTEGER,
    accuracy: DataTypes.INTEGER,
    location: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: 'authorId' });
    Review.belongsTo(models.Listing, { foreignKey: 'listingId' });


  };
  return Review;
};
