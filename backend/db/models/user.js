'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName:{
      type:DataTypes.STRING,
      allowNull:false
    },
    lastName:{
      type:DataTypes.STRING,
      allowNull:false
    },
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate: {
        len: [3, 256]
      },
    },
    hashedPassword: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [60, 60]
      },
    }
  },  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  User.associate = function(models) {
    User.hasMany(models.Booking,{foreignKey:"buyerId", onDelete:'CASCADE',hooks:true})
    User.hasMany(models.Spot,{foreignKey:"hostId", onDelete:'CASCADE',hooks:true})
    User.hasMany(models.Review,{foreignKey:"authorId", onDelete:'CASCADE',hooks:true})
  };
  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username, email, firstName, lastName } = this; // context will be the User instance
    return { id, username, email, firstName, lastName };
  };
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
   };
   User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };
   User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };
  User.signup = async function ({ username, email, password, firstName, lastName }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      firstName,
      lastName
    });
    return await User.scope('currentUser').findByPk(user.id);
  };
  return User;
};
