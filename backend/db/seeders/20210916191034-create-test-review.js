'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Reviews",[{
      authorId:1,
      spotId:12,
      body:"test",
      createdAt:new Date(),
      updatedAt: new Date(),
      rating:5
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
