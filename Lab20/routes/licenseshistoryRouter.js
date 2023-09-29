const Router = require('express');

const router = new Router();
const licenseshistoryController = require('../controller/licenseshistoryController');

router.get('/', licenseshistoryController.getAll)


module.exports = router