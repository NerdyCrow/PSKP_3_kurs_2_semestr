const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Licenses', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Title: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    PaymentDate: {
      type: DataTypes.STRING(75),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    ExpiryDate: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    SoftwareId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Software',
        key: 'Id'
      }
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customers',
        key: 'Id'
      }
    }
  }, {
    sequelize,
    tableName: 'Licenses',
    schema: 'dbo',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "IX_Licenses_CustomerId",
        fields: [
          { name: "CustomerId" },
        ]
      },
      {
        name: "IX_Licenses_SoftwareId",
        fields: [
          { name: "SoftwareId" },
        ]
      },
      {
        name: "PK__Licenses__3214EC0792EB56CD",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
