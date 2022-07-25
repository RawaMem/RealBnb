'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    listingId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    //should work without alias from this side for the listing relationship but we might need it
    Image.belongsTo(models.Listing, { foreignKey: 'listingId' });
    Image.belongsTo(models.User, { foreignKey: 'userId' });

  };
  return Image;
};
