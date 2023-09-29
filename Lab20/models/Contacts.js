const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contacts', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    Address: {
      type: DataTypes.STRING(75),
      allowNull: true
    },
    Phone: {
      type: DataTypes.STRING(75),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Contacts',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Contacts__3214EC0731286984",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
