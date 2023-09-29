const { Sequelize } = require('sequelize');
const { mySqlConfig } = require('../common/config');
const models = require('./models/index');

const sequelize = new Sequelize("nodelab23",
    "nodelab3",
    "userpass",
    {
        dialect: "mssql",
        host: 'localhost',
        port: 1433
    }
);

for (const key in models) {
    models[key](sequelize);
}

module.exports = sequelize;