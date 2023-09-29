const { Sequelize } = require("sequelize")

module.exports = new Sequelize(

    process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD,
    {
        dialect: "mssql",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT

    }
);