import { Sequelize } from "sequelize";
import { dbConfig } from "../config/config.js";

const db = new Sequelize({
    dialect: 'postgres',
    host: dbConfig.host,
    port: parseInt(dbConfig.port),
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database
})

async function syncDatabase() {
    try {
        await db.authenticate();
        console.log("Database connected successfully");
        
        await db.sync({ alter: true });
        console.log(`Database synchronized successfully`);
    } catch (error) {
        console.error('Error synchronized database:', error);
    }
}

syncDatabase();

export default db;