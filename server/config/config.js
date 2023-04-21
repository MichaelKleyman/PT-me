require('dotenv').config();
module.exports = {
  development: {
    username: 'michaelkleyman',
    // password: null,
    database: 'pt_me',
    dialect: 'postgres',
  },
  test: {
    username: 'michaelkleyman',
    // password: null,
    database: 'pt_me',
    dialect: 'postgres',
  },
  production: {
    username: 'michaelkleyman',
    // password: null,
    database: 'pt_me',
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true,
      },
    },
  },
};
