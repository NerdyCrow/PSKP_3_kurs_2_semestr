const Sequelize = require("../DB");
const Contacts = require("../models/Contacts");
const initModels = require("../models/init-models");
const models = initModels(Sequelize);
const contacts = models.Contacts;

class ContactsController {

    async create(req, res) {
        try {
            const { Name, Email, Address, Phone } = req.body;

            const contact = await contacts.create({ Name, Email, Address, Phone });
            return res.json(contact);
        }
        catch (err) { console.log(err); }
    }
    async createOwner(req, res, next) {
        try {
            const { Name, Email, Address, Phone } = req.body;

            const contact = await contacts.create({ Name, Email, Address, Phone });
            req.contactid = contact.Id;
            next()
        }
        catch (err) { console.log(err); }

    }
    async getAll(req, res) {
        const contact = await contacts.findAll();
        res.json(contact);
    }
    async getOne(req, res) {
        const { ID } = req.params;
        console.log({ ID })
        const contact = await contacts.findOne({
            where: { ID }
        });
        res.json(contact);
    }

    async delete(req, res) {
        try {
            const { ID } = req.params
            await contacts.findOne({
                where: { ID }
            })
                .then(result => {

                    contacts.destroy({ where: { ID } })
                        .then(resultD => {
                            if (resultD == 0) {
                                throw new Error('Contacts not found')
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
            const { Id, Name, Email, Address, Phone } = req.body;
            contacts.update({ Name, Email, Address, Phone }, { where: { Id } }).then((result) => {
                if (result == 0) {
                    throw new Error("contact not found!")
                }
                else {
                    res.json(result)
                }
            })
                .catch((error) => res.json(error));

        }
        catch (e) { }
    }
}
module.exports = new ContactsController();