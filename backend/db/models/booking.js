'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    userId: DataTypes.INTEGER,
    listingId: DataTypes.INTEGER,
    totalCost: DataTypes.DECIMAL,
    avePricePerDay: DataTypes.DECIMAL,
    paymentConfirmed: DataTypes.BOOLEAN,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
  };
  return Booking;
};