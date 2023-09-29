const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Owners', {
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
    tableName: 'Owners',
    schema: 'dbo',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "IX_Owners_ContactId",
        fields: [
          { name: "ContactId" },
        ]
      },
      {
        name: "PK__Owners__3214EC07EA773BE2",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
