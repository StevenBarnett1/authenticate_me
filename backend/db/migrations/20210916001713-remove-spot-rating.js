'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Spots","rating",{
      type:Sequelize.INTEGER,
      allowNull:false,
      defaultValue:5
    })
    await queryInterface.removeColumn("Spots","rating")
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
