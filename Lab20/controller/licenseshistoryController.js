const Sequelize = require("../DB");
const initModels = require("../models/init-models");
const models = initModels(Sequelize);
const licenseshistory = models.LicensesHistory;

class LicensesHistoryController {

    async create(req, res) {
        try {
            const { Title, ExpiryDate, SoftwareId, CustomerId } = req.body;
            let expiredate = new Date(ExpiryDate.replace(/\./g, '-')).toISOString();


            const licensehistory = await licenseshistory.create({ LicenseId: req.ID, Title, ExpiryDate: expiredate, SoftwareId, CustomerId });
            return res.json(licensehistory);
        } catch (e) { }
    }
    async getAll(req, res) {
        const licensehistory = await licenseshistory.findAll();
        res.json(licensehistory);
    }



}
module.exports = new LicensesHistoryController();