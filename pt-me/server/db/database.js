const Sequelize = require('sequelize');

const databaseName = 'pt-me';

const db = new Sequelize(`postgres://localhost:5432/${databaseName}`, {
  logging: false, //hides the sequelize queries I believe
});

module.exports = { db };
// export default db
