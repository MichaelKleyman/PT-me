'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScheduleExercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ScheduleExercise.belongsTo(models.Schedule, {
        foreignKey: 'scheduleId',
        as: 'schedule',
      });
      ScheduleExercise.belongsTo(models.Exercises, {
        foreignKey: 'exerciseId',
        as: 'exercise',
      });
    }
  }
  ScheduleExercise.init(
    {
      scheduleId: DataTypes.INTEGER,
      exerciseId: DataTypes.INTEGER,
      date: DataTypes.DATE,
      sets: DataTypes.INTEGER,
      reps: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ScheduleExercise',
    }
  );
  return ScheduleExercise;
};
