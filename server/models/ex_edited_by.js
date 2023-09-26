"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ex_Edited_By extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ex_Edited_By.init(
    {
      ex_id: DataTypes.INTEGER,
      clinciName: DataTypes.STRING,
      editorName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ex_Edited_By",
    }
  );
  return Ex_Edited_By;
};
