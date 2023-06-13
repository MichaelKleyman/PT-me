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
      Exercises.belongsTo(models.Patients, {
        foreignKey: 'patientId',
        as: 'patient',
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
