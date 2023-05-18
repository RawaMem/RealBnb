'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    listingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    }, 
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    } 
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    //should work without alias from this side for the listing relationship but we might need it
    Image.belongsTo(models.Listing, { foreignKey: 'listingId' });
    Image.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Image;
};
