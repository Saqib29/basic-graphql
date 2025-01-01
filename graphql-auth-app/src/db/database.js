const { Sequelize } = require("sequelize");
const { databaseConfig } = require("../config/config");

const sequelize = new Sequelize(
  databaseConfig.postgres_db,
  databaseConfig.postgress_user,
  databaseConfig.postgres_db,
  {
    host: databaseConfig.postgres_host,
    dialect: "postgres",
    logging: false,
  }
)

export default sequelize