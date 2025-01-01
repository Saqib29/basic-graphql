import { Sequelize } from "sequelize"
import { databaseConfig } from "../config/config";

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