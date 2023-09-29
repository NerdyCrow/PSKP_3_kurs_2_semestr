const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customers', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ContactId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Contacts',
        key: 'Id'
      }
    }
  }, {
    sequelize,
    tableName: 'Customers',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_Customers_ContactId",
        fields: [
          { name: "ContactId" },
        ]
      },
      {
        name: "PK__Customer__3214EC0793681B02",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
