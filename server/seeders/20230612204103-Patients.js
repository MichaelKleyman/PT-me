'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('Patients', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Patients',
      [
        {
          title: 'Logan Paul',
          gender: 'Male',
          address: '4307 Hilltop Haven Drive, Newark NJ',
          phoneNumber: '123-456-7890',
          email: 'loganpaul@gmail.com',
          reasonForVisit: 'Torn ACL',
          age: '31',
          injuryId: 3,
          insurance: 'Fidelis',
          start: new Date(2023, 5, 9, 10, 30, 0, 0),
          end: new Date(2023, 5, 9, 12, 30, 0, 0),
        },
        {
          title: 'MikeMajlak',
          gender: 'Male',
          address: '4307 Hilltop Haven Drive, Newark NJ',
          phoneNumber: '123-456-7890',
          email: 'loganpaul@gmail.com',
          reasonForVisit: 'Torn ACL',
          age: '31',
          injuryId: 3,
          insurance: 'Fidelis',
          start: new Date(2023, 5, 9, 2, 0, 0, 0),
          end: new Date(2023, 5, 9, 4, 0, 0, 0),
        },
        {
          title: 'David Goggins',
          gender: 'Male',
          address: '4307 Hilltop Haven Drive, Newark NJ',
          phoneNumber: '123-456-7890',
          email: 'loganpaul@gmail.com',
          reasonForVisit: 'Torn ACL',
          age: '31',
          injuryId: 3,
          insurance: 'Fidelis',
          start: new Date(2023, 5, 9, 4, 0, 0, 0),
          end: new Date(2023, 5, 9, 6, 0, 0, 0),
        },
        {
          title: 'Andrew Shultz',
          gender: 'Male',
          address: '4307 Hilltop Haven Drive, Newark NJ',
          phoneNumber: '123-456-7890',
          email: 'loganpaul@gmail.com',
          reasonForVisit: 'Torn ACL',
          age: '31',
          injuryId: 3,
          insurance: 'Fidelis',
          start: new Date(2023, 5, 9, 6, 0, 0, 0),
          end: new Date(2023, 5, 9, 8, 0, 0, 0),
        },
        {
          title: 'Chris Distefano',
          gender: 'Male',
          address: '4307 Hilltop Haven Drive, Newark NJ',
          phoneNumber: '123-456-7890',
          email: 'loganpaul@gmail.com',
          reasonForVisit: 'Torn ACL',
          age: '31',
          injuryId: 3,
          insurance: 'Fidelis',
          start: new Date(2023, 5, 9, 8, 0, 0, 0),
          end: new Date(2023, 5, 9, 10, 0, 0, 0),
        },
        {
          title: 'Joe Rogan',
          gender: 'Male',
          address: '4307 Hilltop Haven Drive, Newark NJ',
          phoneNumber: '123-456-7890',
          email: 'loganpaul@gmail.com',
          reasonForVisit: 'Torn ACL',
          age: '31',
          injuryId: 3,
          insurance: 'Fidelis',
          start: new Date(2023, 5, 9, 10, 0, 0, 0),
          end: new Date(2023, 5, 9, 12, 0, 0, 0),
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
     */
    await queryInterface.bulkDelete('Patients', null, {});
  },
};
