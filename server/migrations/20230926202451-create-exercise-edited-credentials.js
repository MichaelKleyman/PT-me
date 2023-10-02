"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Exercise_Edited_Credentials", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ex_id: {
        type: Sequelize.INTEGER,
      },
      clinicName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      editorName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      editedFields: {
        type: Sequelize.ARRAY(Sequelize.JSON),
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
    await queryInterface.dropTable("Exercise_Edited_Credentials");
  },
};
