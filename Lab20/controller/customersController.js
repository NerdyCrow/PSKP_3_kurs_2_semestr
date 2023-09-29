const Sequelize = require("../DB");
const Customers = require("../models/Customers");
const initModels = require("../models/init-models");
const models = initModels(Sequelize);
const customers = models.Customers;

class CustomersController {
    async create(req, res) {
        try {
            const { ContactId } = req.body;
            let cont;
            if (!ContactId) cont = req.contactid
            else cont = ContactId
            const customer = await customers.create({ ContactId: cont });
            return res.json(customer);
        } catch (e) { }
    }


    async getAll(req, res) {
        const customer = await customers.findAll();
        res.json(customer);
    }
    async getOne(req, res) {
        const { ID } = req.params;
        console.log(ID)
        const customer = await customers.findOne({
            where: { ID }
        });
        res.json(customer);
    }

    async delete(req, res) {
        try {
            const { ID } = req.params
            await customers.findOne({
                where: { ID }
            })
                .then(result => {

                    customers.destroy({ where: { ID } })
                        .then(resultD => {
                            if (resultD == 0) {
                                throw new Error('Customers not found')
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
            customers.update({ ContactId }, { where: { Id } }).then((result) => {
                if (result == 0) {
                    throw new Error("customer not found!")
                }
                else {
                    res.json(result)
                }
            })
                .catch((error) => res.json(error));
        } catch (e) { }
    }

}
module.exports = new CustomersController();