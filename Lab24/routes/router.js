const {Router} = require('express');
const passport = require('passport');
const secured = require('../middlewares/secured');
const Controller = require('../controllers/controller');


const router = Router();

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', Controller.login);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), Controller.authGoogleCallback);

router.get('/logout', Controller.logout);
router.get('/resource', secured, Controller.resource);

module.exports = router;