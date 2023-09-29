const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('LicensesHistory', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    LicenseId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
      allowNull: false
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'LicensesHistory',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Licenses__3214EC073DAC5561",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
