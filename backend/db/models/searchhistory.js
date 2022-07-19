'use strict';
module.exports = (sequelize, DataTypes) => {
  const SearchHistory = sequelize.define('SearchHistory', {
    userId: DataTypes.INTEGER,
    destination: DataTypes.STRING,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE,
    adultGuests: DataTypes.INTEGER,
    childGuests: DataTypes.INTEGER,
    infantGuests: DataTypes.INTEGER,
    petGuests: DataTypes.INTEGER
  }, {});
  SearchHistory.associate = function(models) {
    // associations can be defined here
    SearchHistory.belongsTo(models.User, { foreignKey: 'userId' });

  };
  return SearchHistory;
};
