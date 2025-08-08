const { Sequelize } = require('sequelize');
require('dotenv').config();

class Database {
    constructor() {
        this.sequelize = new Sequelize({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            dialect: 'postgres'
        });
    }

    async connect() {
        try {
            await this.sequelize.authenticate();
            console.log('Database connected successfully');
        } catch (error) {
            console.error('Database connection error:', error);
        }
    }
}

module.exports = new Database();