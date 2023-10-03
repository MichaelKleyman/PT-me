"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exercise_Edited_Credentials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Exercise_Edited_Credentials.init(
    {
      ex_id: DataTypes.INTEGER,
      clinicName: DataTypes.STRING,
      editorName: DataTypes.STRING,
      editedFields: DataTypes.ARRAY(DataTypes.JSON),
      comments: DataTypes.ARRAY(DataTypes.JSON),
    },
    {
      sequelize,
      modelName: "Exercise_Edited_Credentials",
    }
  );
  return Exercise_Edited_Credentials;
};
