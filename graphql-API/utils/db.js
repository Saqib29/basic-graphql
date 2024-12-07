import { Sequelize } from "sequelize";
import { db } from "../lib/config";

const db = new Sequelize({
    dialect: 'postgres',
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.database
})

async function syncDatabase() {
    try {
        await db.authenticate();
        await db.sync({ alter: true });
        console.log(`Database synchronized successfully`);
    } catch (error) {
        console.log('Error synchronized database:', error);
    }
}

syncDatabase();

module.exports = db;