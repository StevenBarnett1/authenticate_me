'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User,{foreignKey:"hostId"})
      Spot.hasMany(models.Booking,{foreignKey:"spotId"})
    }
  };
  Spot.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    city: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    state: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    zipCode: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    hostId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
