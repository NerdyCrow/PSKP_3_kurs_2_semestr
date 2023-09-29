const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Software', {
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
    Version: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    Price: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: false
    },
    OwnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Owners',
        key: 'Id'
      }
    },
    DateCreated: {
      type: DataTypes.STRING(75),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Software',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_Software_OwnerId",
        fields: [
          { name: "OwnerId" },
        ]
      },
      {
        name: "PK__Software__3214EC07ED460441",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
