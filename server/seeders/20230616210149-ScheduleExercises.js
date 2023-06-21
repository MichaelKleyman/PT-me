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
      'ScheduleExercises',
      [
        {
          scheduleId: 1,
          exerciseId: 1,
          date: new Date('6/19/23'),
          sets: 3,
          reps: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scheduleId: 1,
          exerciseId: 1,
          date: new Date('6/20/23'),
          sets: 3,
          reps: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scheduleId: 1,
          exerciseId: 1,
          date: new Date('6/21/23'),
          sets: 3,
          reps: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scheduleId: 1,
          exerciseId: 1,
          date: new Date('6/22/23'),
          sets: 3,
          reps: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        
        {
          scheduleId: 1,
          exerciseId: 2,
          date: new Date('6/19/23'),
          sets: 3,
          reps: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scheduleId: 1,
          exerciseId: 2,
          date: new Date('6/20/23'),
          sets: 3,
          reps: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scheduleId: 1,
          exerciseId: 2,
          date: new Date('6/21/23'),
          sets: 3,
          reps: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scheduleId: 1,
          exerciseId: 2,
          date: new Date('6/22/23'),
          sets: 3,
          reps: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scheduleId: 1,
          exerciseId: 3,
          date: new Date('6/19/23'),
          sets: 3,
          reps: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scheduleId: 1,
          exerciseId: 3,
          date: new Date('6/20/23'),
          sets: 3,
          reps: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scheduleId: 1,
          exerciseId: 3,
          date: new Date('6/21/23'),
          sets: 3,
          reps: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scheduleId: 1,
          exerciseId: 3,
          date: new Date('6/22/23'),
          sets: 3,
          reps: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scheduleId: 1,
          exerciseId: 4,
          date: new Date('6/19/23'),
          sets: 3,
          reps: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scheduleId: 1,
          exerciseId: 4,
          date: new Date('6/20/23'),
          sets: 3,
          reps: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scheduleId: 1,
          exerciseId: 4,
          date: new Date('6/21/23'),
          sets: 3,
          reps: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scheduleId: 1,
          exerciseId: 4,
          date: new Date('6/22/23'),
          sets: 3,
          reps: 10,
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
