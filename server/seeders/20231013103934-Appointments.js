"use strict";

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
      "Appointments",
      [
        {
          patientId: 1,
          start: new Date(2023, 5, 9, 10, 30, 0, 0),
          end: new Date(2023, 13, 10, 12, 30, 0, 0),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          patientId: 2,
          start: new Date(2023, 13, 10, 2, 0, 0, 0),
          end: new Date(2023, 13, 10, 4, 0, 0, 0),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          patientId: 2,
          start: new Date(2023, 14, 10, 2, 0, 0, 0),
          end: new Date(2023, 14, 10, 4, 0, 0, 0),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          patientId: 3,
          start: new Date(2023, 13, 10, 2, 0, 0, 0),
          end: new Date(2023, 13, 10, 4, 0, 0, 0),
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
