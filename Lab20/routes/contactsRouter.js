const Router = require('express');
const router = new Router();
const contactsController = require('../controller/contactsController');
const customersController = require('../controller/customersController');
const ownersController = require('../controller/ownersController');

router.post('/', contactsController.create)
router.post('/owner', contactsController.createOwner, ownersController.create)
router.post('/customer', contactsController.createOwner, customersController.create)

router.get('/', contactsController.getAll)
router.get('/:ID', contactsController.getOne)
router.put('/', contactsController.update)
router.delete('/:ID', contactsController.delete)



module.exports = router