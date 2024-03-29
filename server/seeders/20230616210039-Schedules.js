'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Schedules',
      [
        {
          patientId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          patientId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          patientId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          patientId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          patientId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          patientId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
