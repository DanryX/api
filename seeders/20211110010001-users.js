'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@test.com',
        phone: '+79991234567',
        password: await bcrypt.hash('123456', 10),
        role: 'admin',
        language: 'ru',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'test',
        email: 'test@test.com',
        phone: '+79991112233',
        password: await bcrypt.hash('123', 10),
        role: 'user',
        language: 'ru',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('users', null, {});
  }
};
