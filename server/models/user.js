'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      clinicName: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
    (User.prototype.generateToken = function () {
      const token = jwt.sign({ id: this.id }, process.env.JWT);
      return token;
    }),
    (User.prototype.correctPassword = function (candidatePwd) {
      //we need to compare the plain version to an encrypted version of the password
      return bcrypt.compare(candidatePwd, this.password);
    }),
    (User.authenticate = async function ({ clinicName, password }) {
      const user = await this.findOne({ where: { clinicName } });
      if (!user || !(await user.correctPassword(password))) {
        const error = Error('Incorrect username or password.');
        error.status = 401;
        throw error;
      }
      return user.generateToken();
    }),
    (User.findByToken = async function (token) {
      try {
        const { id } = await jwt.verify(token, process.env.JWT);
        const user = User.findByPk(id);
        if (!user) {
          throw 'ERROR';
        }
        return user;
      } catch (ex) {
        const error = Error('bad token');
        error.status = 401;
        throw error;
      }
    }),
    User.addHook('beforeCreate', async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 3);
      }
    }),
    User.addHook('beforeUpdate', async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 3);
      }
    }),
    User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)))
  );
  return User;
};
