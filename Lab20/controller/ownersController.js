const Sequelize = require("../DB");
const Owners = require("../models/Owners");
const initModels = require("../models/init-models");
const models = initModels(Sequelize);
const owners = models.Owners;

class OwnersController {
    async create(req, res) {
        try {
            const { ContactId } = req.body;
            console.log(ContactId);
            let cont;
            if (!ContactId) cont = req.contactid
            else cont = ContactId
            const owner = await owners.create({ ContactId: cont });
            return res.json(owner);
        } catch (e) { }
    }
    async getAll(req, res) {
        const owner = await owners.findAll();
        res.json(owner);
    }
    async getOne(req, res) {
        const { ID } = req.params;
        console.log(ID)
        const owner = await owners.findOne({
            where: { ID }
        });
        res.json(owner);
    }

    async delete(req, res) {
        try {
            const { ID } = req.params
            await owners.findOne({
                where: { ID }
            })
                .then(result => {

                    owners.destroy({ where: { ID } })
                        .then(resultD => {
                            if (resultD == 0) {
                                throw new Error('Owners not found')
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
            const { Id, ContactId } = req.body;
            owners.update({ ContactId }, { where: { Id } }).then((result) => {
                if (result == 0) {
                    throw new Error("owner not found!")
                }
                else {
                    res.json(result)
                }
            })
                .catch((error) => res.json(error));
        } catch (e) { }
    }
}
module.exports = new OwnersController();