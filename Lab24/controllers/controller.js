const path = require('path');

class Controller {
    static login(req, res) {
        res.sendFile(path.join(__dirname, '../views/login.html'));
    }

    static authGoogleCallback(req, res) {
        res.redirect('/resource');
    }

    static logout(req, res) {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/login');
        });
    }

    static resource(req, res) {
        console.log(`User ${req.user.profile.displayName} (id: ${req.user.profile.id})`);
        res.status(200).send(`Resource:User ${req.user.profile.displayName} (id: ${req.user.profile.id})`);
    }
}

module.exports = Controller;
