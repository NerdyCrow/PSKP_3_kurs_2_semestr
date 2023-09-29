const Router = require('express');

const router = new Router();
const ownersController = require('../controller/ownersController');
router.post('/', ownersController.create)
router.get('/', ownersController.getAll)
router.get('/:ID', ownersController.getOne)
router.put('/', ownersController.update)
router.delete('/:ID', ownersController.delete)



module.exports = router