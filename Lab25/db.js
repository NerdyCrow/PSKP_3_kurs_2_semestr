const {Sequelize} = require('sequelize');


module.exports =  new Sequelize(
    'lab25node', 
    'nodelab3', 
    'userpass', 
{
    dialect: 'mssql',
    host: 'localhost',
    port: 1433,
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});