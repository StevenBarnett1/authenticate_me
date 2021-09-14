'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      description:{
        type:Sequelize.TEXT,
        allowNull:false
      },
      city: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      hostId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Users"
        }
      },
      rating:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:5
      },
      image:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      price: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Spots');
  }
};
