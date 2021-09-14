'use strict';
let bcrypt = require("bcryptjs")
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users",[{
      username:"John",
      firstName:"John",
      lastName:"Smith",
      email:"johnSmith@gmail.com",
      hashedPassword:bcrypt.hashSync('johnpassword'),
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      username:"Tara",
      firstName:"Tara",
      lastName:"Jones",
      email:"taraJones@gmail.com",
      hashedPassword:bcrypt.hashSync('tarapassword'),
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      username:"Elizabeth",
      firstName:"Elizabeth",
      lastName:"Davis",
      email:"elizabethDavis@gmail.com",
      hashedPassword:bcrypt.hashSync('elizabethpassword'),
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      username:"Robert",
      firstName:"Robert",
      lastName:"Williams",
      email:"robertWilliams@gmail.com",
      hashedPassword:bcrypt.hashSync('robertpassword'),
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      username:"Patricia",
      firstName:"Patricia",
      lastName:"Miller",
      email:"patriciaMiller@gmail.com",
      hashedPassword:bcrypt.hashSync('patriciapassword'),
      createdAt:new Date(),
      updatedAt:new Date()
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op
    await queryInterface.bulkDelete("Users",{
      firstName:{
        [Op.iLike]: '%""%'
      }
    })
  }
};
