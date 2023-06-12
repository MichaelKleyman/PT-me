'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patients.init({
    title: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    reasonForVisit: DataTypes.STRING,
    insuranceName: DataTypes.STRING,
    injuryId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Patients',
  });
  return Patients;
};