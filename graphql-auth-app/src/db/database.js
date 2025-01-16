import { Sequelize } from "sequelize"
import { databaseConfig } from "../config/config.js";

const sequelize = new Sequelize(
  databaseConfig.postgres_db,
  databaseConfig.postgres_user,
  databaseConfig.postgres_password,
  {
    host: databaseConfig.postgres_host,
    dialect: "postgres",
    logging: false,
  }
)

export default sequelize