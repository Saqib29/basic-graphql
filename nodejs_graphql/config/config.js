require('dotenv').config()

module.exports = {
  development: {
    username: process.env.POSTGRES_USER || "saqib",
    password: process.env.POSTGRES_PASSWORD || "password",
    database: process.env.POSTGRES_DB || "post_db",
    host: process.env.POSTGRES_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "postgres",
    port: process.env.POSTGRES_PORT || 5432
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}
