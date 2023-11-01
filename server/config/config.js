require("dotenv").config();
module.exports = {
  development: {
    username: "michaelkleyman",
    // password: null,
    database: "pt_me",
    dialect: "postgres",
  },
  test: {
    username: "michaelkleyman",
    // password: null,
    database: "pt_me",
    dialect: "postgres",
  },
  production: {
    // username: "ptme_nuxl_user",
    username: "postgres",
    // password: "TituchjSp80Y2CGZZ2qyqk7og8n6MiPr",
    password: "e3c98c5845ba3906",
    // database: "ptme_nuxl",
    database: "postgres",
    use_env_variable: "DATABASE_URL",
    listen_addresses: "*",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true,
      },
    },
  },
};
