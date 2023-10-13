"use strict";

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
      "Patients",
      [
        {
          title: "Logan Paul",
          gender: "Male",
          address: "4307 Hilltop Haven Drive, Newark NJ",
          phoneNumber: "123-456-7890",
          email: "loganpaul@gmail.com",
          reasonForVisit: "Torn ACL",
          age: "31",
          injuryId: 3,
          clinicId: 1,
          insurance: "Fidelis",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Mike Majlak",
          gender: "Male",
          address: "4307 Hilltop Haven Drive, Newark NJ",
          phoneNumber: "123-456-7890",
          email: "loganpaul@gmail.com",
          reasonForVisit: "Torn ACL",
          age: "31",
          injuryId: 3,
          clinicId: 1,
          insurance: "Fidelis",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "David Goggins",
          gender: "Male",
          address: "4307 Hilltop Haven Drive, Newark NJ",
          phoneNumber: "123-456-7890",
          email: "loganpaul@gmail.com",
          reasonForVisit: "Torn ACL",
          age: "31",
          injuryId: 3,
          clinicId: 1,
          insurance: "Fidelis",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Andrew Shultz",
          gender: "Male",
          address: "4307 Hilltop Haven Drive, Newark NJ",
          phoneNumber: "123-456-7890",
          email: "loganpaul@gmail.com",
          reasonForVisit: "Torn ACL",
          age: "31",
          injuryId: 3,
          clinicId: 1,
          insurance: "Fidelis",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Chris Distefano",
          gender: "Male",
          address: "4307 Hilltop Haven Drive, Newark NJ",
          phoneNumber: "123-456-7890",
          email: "loganpaul@gmail.com",
          reasonForVisit: "Torn ACL",
          age: "31",
          injuryId: 3,
          clinicId: 1,
          insurance: "Fidelis",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Joe Rogan",
          gender: "Male",
          address: "4307 Hilltop Haven Drive, Newark NJ",
          phoneNumber: "123-456-7890",
          email: "loganpaul@gmail.com",
          reasonForVisit: "Torn ACL",
          age: "31",
          injuryId: 3,
          clinicId: 1,
          insurance: "Fidelis",
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
     */
    await queryInterface.bulkDelete("Patients", null, {});
  },
};
