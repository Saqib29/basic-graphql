import dotenv from 'dotenv'
dotenv.config()


export const dbConfig = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
}

export const serverConfig = {
    port: process.env.PORT
}