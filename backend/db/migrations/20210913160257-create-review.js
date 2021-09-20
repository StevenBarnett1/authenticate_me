'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Users"
        }
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Spots"
        }
      },
      body: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      rating: {
        type: Sequelize.NUMERIC(3,2),
        allowNull:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews');
  }
};
