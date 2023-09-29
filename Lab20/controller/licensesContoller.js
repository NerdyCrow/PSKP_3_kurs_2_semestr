const Sequelize = require("../DB");
const initModels = require("../models/init-models");
const models = initModels(Sequelize);
const licenses = models.Licenses;

class LicensesController {
    async create(req, res, next) {
        try {
            const { Title, ExpiryDate, SoftwareId, CustomerId } = req.body;
            let expiredate = new Date(ExpiryDate.replace(/\./g, '-')).toISOString();

            const license = await licenses.create({ Title, ExpiryDate: expiredate, SoftwareId, CustomerId })

            req.ID = license.Id
            next();
        }
        catch (e) {

        }
    }
    async getAll(req, res) {
        const license = await licenses.findAll();
        console.log(license);
        res.json(license);
    }
    async getOne(req, res) {
        const { ID } = req.params;
        const license = await licenses.findOne({
            where: { ID }
        });
        res.json(license);
    }

    async delete(req, res) {
        try {
            const { ID } = req.params
            await licenses.findOne({
                where: { ID }
            })
                .then(result => {

                    licenses.destroy({ where: { ID } })
                        .then(resultD => {
                            if (resultD == 0) {
                                throw new Error('License not found')
                            }
                            else {
                                res.json(result)
                            }
                        })
                        .catch(error => console.log(error))
                }).catch(error => res.json(error));
        } catch (e) { }
    }

    async update(req, res) {
        try {
            const { Id, Title, ExpiryDate, SoftwareId, CustomerId } = req.body;
            let expiredate = new Date(ExpiryDate);
            licenses.update({ Title, expiredate, SoftwareId, CustomerId }, { where: { Id } }).then((result) => {
                if (result == 0) {
                    throw new Error("contact not found!")
                }
                else {
                    res.json(result)
                }
            })
                .catch((error) => res.json(error));
        } catch (e) { }
    }
}
module.exports = new LicensesController();