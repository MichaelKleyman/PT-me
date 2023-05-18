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
    await queryInterface.bulkInsert('Exercises', [
      {
        name: 'External rotation',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/_UvmPNGtlPM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pendulum',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/L4QrSkoXpIw',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Crossover Arm Stretch',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/ATusl0jg4SU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Passive Internal Rotation',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/RNaMFoh1k64',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Passive External Rotation',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/ZbUoLkxYVMY',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sleeper Stretch',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/OX6GtqNsHjE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Standing Row',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/a7hcEMgr198',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Internal Rotation',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/QFnXM2ueUIE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Scapula Setting',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/WklUZWulQao',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Scapular Retraction/Protraction',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/gdiZFeaOQk0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bent-Over Horizontal Abduction',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/ncQ5kMwV7nY',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lateral Raises',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/wZnsZsMywrY',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Childs Pose',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Childs Pose',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Childs Pose',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Childs Pose',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Childs Pose',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Childs Pose',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Childs Pose',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Childs Pose',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Childs Pose',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Childs Pose',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Childs Pose',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Childs Pose',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Childs Pose',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quad Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quad Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quad Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quad Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quad Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quad Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quad Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quad Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quad Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quad Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quad Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quad Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'External hip rotation',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'External hip rotation',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'External hip rotation',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'External hip rotation',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'External hip rotation',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'External hip rotation',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'External hip rotation',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'External hip rotation',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'External hip rotation',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'External hip rotation',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'External hip rotation',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'External hip rotation',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/db__jO8RFwU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Exercises', null, {});
  },
};
