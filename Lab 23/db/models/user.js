const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING(30),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
    }, {
        timestamps: false,
        tableName: 'users',
    })
};