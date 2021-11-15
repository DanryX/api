'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'admin',
        title: 'Administrator',
        permissions: 'base:view|base:edit|base:create|all:view|all:edit|all:create'
      },
      {
        name: 'user',
        title: 'User',
        permissions: 'base:view'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('roles', null, {});
  }
};
