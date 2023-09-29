const Sequelize = require("sequelize");
const sequelize = new Sequelize("SVN", "conuser", "ConUser", 
{
    dialect: "mssql",
    host: "localhost",
    port: "1433",
    pool: {
        max: 10,
        min: 0,
        idle: 10000,
        acquire: 100000
    }
}
);
sequelize.addHook('beforeBulkDestroy',()=>{
    console.log('хук BeforeDelete');
});
module.exports = sequelize;
