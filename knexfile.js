// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      database: process.env.DEVELOPMENT_DB_NAME,
      user: process.env.DEVELOPMENT_DB_USER,
      password: process.env.DEVELOPMENT_DB_PASSWORD,
      port: 3306,
      host: process.env.DEVELOPMENT_DB_HOST,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/migrations",
    },
  },
  production: {
    client: "mysql2",
    connection: {
      database: process.env.PRODUCTION_DB_NAME,
      user: process.env.PRODUCTION_DB_USER,
      password: process.env.PRODUCTION_DB_PASSWORD,
      port: 3306,
      host: process.env.PRODUCTION_DB_HOST,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/migrations",
    },
  },
};
