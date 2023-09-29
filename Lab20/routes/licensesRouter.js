const Router = require('express');

const router = new Router();
const licenseController = require('../controller/licensesContoller');
const licenseshistoryController = require('../controller/licenseshistoryController');

router.post('/', licenseController.create, licenseshistoryController.create)
router.get('/', licenseController.getAll)
router.get('/:ID', licenseController.getOne)
router.put('/', licenseController.update)
router.delete('/:ID', licenseController.delete)

module.exports = router