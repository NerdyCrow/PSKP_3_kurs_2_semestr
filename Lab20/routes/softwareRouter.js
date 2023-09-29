const Router = require('express');

const router = new Router();
const softwareController = require('../controller/softwareController');

router.post('/', softwareController.create)
router.get('/', softwareController.getAll)
router.get('/:ID', softwareController.getOne)
router.put('/', softwareController.update)
router.delete('/:ID', softwareController.delete)

module.exports = router