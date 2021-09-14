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
      Spot.hasMany(models.Booking,{foreignKey:"spotId", onDelete:'CASCADE',hooks:true})
      Spot.hasMany(models.Review,{foreignKey:"spotId", onDelete:'CASCADE',hooks:true})
    }
  };
  Spot.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    description:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    city: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    state: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    hostId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    rating:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:5
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
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
