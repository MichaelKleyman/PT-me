'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      injuryId: {
        type: Sequelize.INTEGER,
      },
      videoLink: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tips: {
        type: Sequelize.STRING(800),
      },
      description: {
        type: Sequelize.STRING(800),
        allowNull: false,
      },
      musclesWorked: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Exercises');
  },
};
