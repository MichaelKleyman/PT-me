'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercises extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exercises.belongsToMany(models.Patients, {
        through: 'PatientExercises',
        foreignKey: 'exerciseId',
        otherKey: 'patientId',
      });
    }
  }
  Exercises.init(
    {
      name: DataTypes.STRING,
      injuryId: DataTypes.INTEGER,
      videoLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Exercises',
    }
  );
  return Exercises;
};
