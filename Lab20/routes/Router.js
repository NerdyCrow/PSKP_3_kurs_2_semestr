const Router = require('express');
const softwareRouter = require('./softwareRouter');
const licensesRouter = require('./licensesRouter');
const contactsRouter = require('./contactsRouter');
const customersRouter = require('./customersRouter');
const ownersRouter = require('./ownersRouter');
const licenseshistoryRouter = require('../routes/licenseshistoryRouter');
const router = new Router();


router.use('/software', softwareRouter)
router.use('/licenses', licensesRouter)
router.use('/licenseshistory', licenseshistoryRouter)
router.use('/contacts', contactsRouter)
router.use('/customers', customersRouter)
router.use('/owners', ownersRouter)


module.exports = router