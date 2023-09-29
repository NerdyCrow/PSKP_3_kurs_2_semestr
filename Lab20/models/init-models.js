var DataTypes = require("sequelize").DataTypes;
var _Contacts = require("./Contacts");
var _Customers = require("./Customers");
var _Licenses = require("./Licenses");
var _LicensesHistory = require("./LicensesHistory");
var _Owners = require("./Owners");
var _Software = require("./Software");

function initModels(sequelize) {
  var Contacts = _Contacts(sequelize, DataTypes);
  var Customers = _Customers(sequelize, DataTypes);
  var Licenses = _Licenses(sequelize, DataTypes);
  var LicensesHistory = _LicensesHistory(sequelize, DataTypes);
  var Owners = _Owners(sequelize, DataTypes);
  var Software = _Software(sequelize, DataTypes);

  Customers.belongsTo(Contacts, { as: "Contact", foreignKey: "ContactId"});
  Contacts.hasMany(Customers, { as: "Customers", foreignKey: "ContactId"});
  Owners.belongsTo(Contacts, { as: "Contact", foreignKey: "ContactId"});
  Contacts.hasMany(Owners, { as: "Owners", foreignKey: "ContactId"});
  Licenses.belongsTo(Customers, { as: "Customer", foreignKey: "CustomerId"});
  Customers.hasMany(Licenses, { as: "Licenses", foreignKey: "CustomerId"});
  Software.belongsTo(Owners, { as: "Owner", foreignKey: "OwnerId"});
  Owners.hasMany(Software, { as: "Softwares", foreignKey: "OwnerId"});
  Licenses.belongsTo(Software, { as: "Software", foreignKey: "SoftwareId"});
  Software.hasMany(Licenses, { as: "Licenses", foreignKey: "SoftwareId"});

  return {
    Contacts,
    Customers,
    Licenses,
    LicensesHistory,
    Owners,
    Software,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
