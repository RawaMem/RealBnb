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
    Image.hasMany(models.Listing, { foreignKey: 'previewImageId' });
    Image.belongsTo(models.Listing, { foreignKey: 'listingId' });
    Image.belongsTo(models.User, { foreignKey: 'userId' });

  };
  return Image;
};
