'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PatientExercises extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PatientExercises.init(
    {
      patientId: DataTypes.NUMBER,
      exerciseId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: 'PatientExercises',
    }
  );
  return PatientExercises;
};
