"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointments.belongsTo(models.Patients, {
        foreignKey: "patientId", // This links the Appointments model to the patientId field in the Patients model
        as: "patient", // This sets the alias for the association (you can use any alias you prefer)
      });
      Appointments.belongsTo(models.User, {
        foreignKey: "clinicId",
        as: "clinic",
      });
      // By setting up this association, you can easily access a patient's appointments using patient.getAppointments() and retrieve the patient for a given appointment using appointment.getPatient(). The alias you set (e.g., 'appointments' and 'patient') allows you to use more readable and meaningful function names when accessing the associated data.
    }
  }
  Appointments.init(
    {
      clinicId: DataTypes.NUMBER,
      patientId: DataTypes.NUMBER,
      start: DataTypes.DATE,
      end: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Appointments",
    }
  );
  return Appointments;
};
