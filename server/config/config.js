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
    username: "ptme_nuxl_user",
    password: "TituchjSp80Y2CGZZ2qyqk7og8n6MiPr",
    database: "ptme_nuxl",
    use_env_variable: "DATABASE_URL",
    // listen_addresses: "*",
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
