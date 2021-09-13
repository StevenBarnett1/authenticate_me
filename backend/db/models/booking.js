'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User,{foreignKey:"buyerId"})
      Booking.belongsTo(models.Spot,{foreignKey:"spotId"})
    }
  };
  Booking.init({
    buyerId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    spotId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    checkin: {
      type:DataTypes.DATE,
      allowNull:false,
    },
    checkout: {
      type:DataTypes.DATE,
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
