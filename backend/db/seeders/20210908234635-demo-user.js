'use strict';
let bcrypt = require("bcryptjs")
let password = "password"
let username = "demo user"
let email = "demoemail@demo.com"
let hashedPassword = bcrypt.hashSync(password,10)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users",[{
      username,
      email,
      hashedPassword
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users",[{
      username:"demo user"
    }])
  }
};
