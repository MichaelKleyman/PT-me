'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patients.belongsToMany(models.Exercises, {
        through: 'PatientExercises',
        foreignKey: 'patientId',
        otherKey: 'exerciseId',
      });
    }
  }
  Patients.init(
    {
      title: DataTypes.STRING,
      gender: DataTypes.STRING,
      age: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      email: DataTypes.STRING,
      reasonForVisit: DataTypes.STRING,
      insurance: DataTypes.STRING,
      injuryId: DataTypes.NUMBER,
      clinicId: DataTypes.NUMBER,
      start: DataTypes.DATE,
      end: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Patients',
    }
  );
  return Patients;
};
