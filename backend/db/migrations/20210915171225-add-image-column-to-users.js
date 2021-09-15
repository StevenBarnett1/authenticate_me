'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users","image",{
      type:Sequelize.STRING,
      allowNull:false,
      defaultValue:"https://www.cmmhealth.org/custom/images/blank-profile-hi.png"
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users","image")
  }
};
