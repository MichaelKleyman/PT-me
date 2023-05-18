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
        name: 'Bird Dog',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/b6zcIxFkuN4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bridge',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/I6vxggX_1KM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pelvic Tilts',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/xOdfBCql6rw',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Side-to-Side',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/-7XWweC0ivs',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hamstring Stretch',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/C-wiOqYcxoI',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Piriformis Stretch',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/iL19XaxMmP4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '1/2 Kneeling Hip Flexor Stretch',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/Q4Ko275cluo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Knee to Chest',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/8kzfXDNq_P8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Knee Rotation',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/ENIEUp78CqY',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cobra Stretch',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/JDcdhTuycOI',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cat/Cow',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/u5TglXNBrtE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Child’s Pose',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/2vJKSlfLX10',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Foam rolling',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/aQ565ee0DrE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Straight Leg Raises',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/drEiYK2li9Q',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quad Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/l83s6t8VWsE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hamstring Curls',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/oWu8RxtWdGE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Squats',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/WbKT5b8ydmM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Prone Straight Leg Raises',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/7WkAPLOaxmk',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Wall Squats',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/aKBxiKs9n8A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Calf Raises',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/C7qnbmpLNGI',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Step-Ups',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/ACY7U8fOEdU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Side Leg Raises',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/izV5th7AQHM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Leg Presses',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/8nQteJqlBF8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heel Cord Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/6P_r7NIjj_o',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Standing Quadriceps Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/pAm21cf6OLI',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Clamshells',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/m_ZPapmqeNM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cossack Squat',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/usfu415_0AI',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'World’s greatest stretch',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/o04xhq1b2bI',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '90/90 Stretch',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/VYvMMw8z3rE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Frog Stretch',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/mO8S7qOdcdU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Asian Squat',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/Vhqwshad4FU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bear Sit Hinge',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/Yu4Yq6sCMvc',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Butterfly Pose',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/MdE_Cj6ChLo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Reclining Pigeon Pose',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/WDOBkhKEuu0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'External hip rotation',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/-pNMOAL6fro',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sit to stand',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/5yxfzyzEzBY',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Single Leg Hip Rotations',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/73XPwD9VHLk',
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
