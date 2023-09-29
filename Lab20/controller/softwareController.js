const Sequelize = require("../DB");
const Software = require("../models/Software");
const initModels = require("../models/init-models");
const models = initModels(Sequelize);
const softwares = models.Software;

class SoftwareController {
    async create(req, res) {

        try {
            const { Name, Version, Price, OwnerId, DateCreated } = req.body;

            const software = await softwares.create({ Name, Version, Price, OwnerId, DateCreated });
            return res.json(software);
        } catch (e) { }
    }
    async getAll(req, res) {
        const software = await softwares.findAll();
        res.json(software);
    }
    async getOne(req, res) {
        const { ID } = req.params;
        console.log(ID)
        const software = await softwares.findOne({
            where: { ID }
        });
        res.json(software);
    }

    async delete(req, res) {
        try {
            const { ID } = req.params
            await softwares.findOne({
                where: { ID }
            })
                .then(result => {

                    softwares.destroy({ where: { ID } })
                        .then(resultD => {
                            if (resultD == 0) {
                                throw new Error('Software not found')
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
            const { Id, Name, Version, Price, OwnerId, DateCreated } = req.body;
            softwares.update({ Name, Version, Price, OwnerId, DateCreated }, { where: { Id } }).then((result) => {
                if (result == 0) {
                    throw new Error("software not found!")
                }
                else {
                    res.json(result)
                }
            })
                .catch((error) => res.json(error));
        } catch (e) { }
    }
}
module.exports = new SoftwareController();