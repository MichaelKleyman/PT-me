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
    username: "ptme_user",
    password: "rBeW7lwQFWnv8ZCPgBZ6JOM1GyDma49t",
    database: "ptme",
    use_env_variable:
      "postgres://ptme_user:rBeW7lwQFWnv8ZCPgBZ6JOM1GyDma49t@dpg-ckr8c99rfc9c73d6n5dg-a/ptme",
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
