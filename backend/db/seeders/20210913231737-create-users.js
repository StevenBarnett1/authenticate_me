'use strict';
let bcrypt = require("bcryptjs")
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users",[{
      username:"Kanye",
      firstName:"Kanye",
      lastName:"West",
      email:"kanyewest@gmail.com",
      hashedPassword:bcrypt.hashSync('kanyepassword'),
      image:"https://pyxis.nymag.com/v1/imgs/ff6/0bb/0a83100bb574e271d0b6054ccd251b223a-08-kanye-west.rsquare.w1200.jpg",
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      username:"Will",
      firstName:"Will",
      lastName:"Smith",
      email:"willsmith@gmail.com",
      hashedPassword:bcrypt.hashSync('willpassword'),
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLBgFKidk4cMvkjQjqhznsLV0v3DWORFhPyf6dDpY0qbU3aoMsbDombGPb1EkZbR_TcPo&usqp=CAU",
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      username:"Dwayne",
      firstName:"Dwayne",
      lastName:"Johnson",
      email:"dwaynejohnson@gmail.com",
      hashedPassword:bcrypt.hashSync('dwaynepassword'),
      image: "https://media.vanityfair.com/photos/5b46274a6520f70b78e5cfe5/4:3/w_1280,h_960,c_limit/The-Rock-2020-Potential-Run.jpg",
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      username:"Jennifer",
      firstName:"Jennifer",
      lastName:"Aniston",
      email:"jenniferaniston@gmail.com",
      hashedPassword:bcrypt.hashSync('jenniferpassword'),
      image:"https://www.hellomagazine.com/imagenes/fashion/celebrity-style/20210909121322/jennifer-aniston-wows-never-ending-legs-tiny-shorts-lolavie-haircare/0-585-927/jennifer-aniston-hair-t.jpg",
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      username:"Tom",
      firstName:"Tom",
      lastName:"Cruise",
      email:"tomcruise@gmail.com",
      hashedPassword:bcrypt.hashSync('tompassword'),
      image:"https://www.hellomagazine.com/imagenes/fashion/celebrity-style/20210909121322/jennifer-aniston-wows-never-ending-legs-tiny-shorts-lolavie-haircare/0-585-927/jennifer-aniston-hair-t.jpg",
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
