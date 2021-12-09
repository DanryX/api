'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        isEmail: true
      },

      phone: {
        type: Sequelize.STRING,
        unique: true
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false
      },

      reset: {
        type: Sequelize.STRING
      },

      resetExpire: {
        type: Sequelize.DATE
      },

      role: {
        type: Sequelize.STRING,
        references: {
          model: 'roles',
          key: 'name'
        },
        allowNull: false
      },

      language: {
        type: Sequelize.STRING
      },

      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('users');
  }
};
