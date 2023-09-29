const Router = require('express');

const router = new Router();
const customersController = require('../controller/customersController');
router.post('/', customersController.create)
router.get('/', customersController.getAll)
router.get('/:ID', customersController.getOne)
router.put('/', customersController.update)
router.delete('/:ID', customersController.delete)



module.exports = router