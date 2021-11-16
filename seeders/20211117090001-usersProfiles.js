'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usersProfiles', [
      {
        userId: 1,
        firstName: 'Vasiliy',
        lastName: 'Ivanov',
        patronymic: 'Dmitryevich',
        gender: 'male',
        dob: '2001-01-01'
      },
      {
        userId: 2,
        firstName: 'Mariya',
        lastName: 'Petrova',
        patronymic: 'Mikhailovna',
        gender: 'female',
        dob: '2002-02-02'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('usersProfiles', null, {});
  }
};
