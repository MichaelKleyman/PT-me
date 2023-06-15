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
      'PatientExercises',
      [
        {
          patientId: 1,
          exerciseId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          patientId: 1,
          exerciseId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          patientId: 1,
          exerciseId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          patientId: 1,
          exerciseId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          patientId: 1,
          exerciseId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          patientId: 1,
          exerciseId: 7,
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
    await queryInterface.bulkDelete('PatientExercises', null, {});
  },
};
