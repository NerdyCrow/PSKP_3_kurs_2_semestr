const fs = require('fs');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const DigestStrategy = require('passport-http').DigestStrategy;
const PORT = 3000


const users = require('./users.json');



function findUser(username) {
    return users.find(user => user.username === username);
}

passport.use(new DigestStrategy({ qop: 'auth' }, (username, done) => {
    const user = findUser(username);
    if (user) {
        return done(null, user, user.password);
    } else {
        return done(null, false, { message: 'incorrect username' });
    }
}));

const app = express();
app.use(passport.initialize());
app.use(session({
    secret: 'cookie_secret',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    res.redirect('/login');
})

app.get('/login',
    (req, res, next) => {
        console.log('login');
        if (req.session.logout && req.headers['authorization']) {
            req.session.logout = false;
            delete req.headers['authorization'];
        }
        next();
    },
    passport.authenticate('digest', { session: false, successRedirect: '/resource' }),
);

app.get('/resource',
    passport.authenticate('digest', { session: false }),
    (req, res) => {
        console.log('resource');
        fs.createReadStream('./static/index.html').pipe(res);
    })

app.get('/logout', (req, res) => {
    console.log('logout');
    req.session.logout = true;
    res.redirect('/login');
})

app.use((req, res) => {
    res.status(404).send('Not Found');
})

app.listen(PORT, () => console.info(`Server is running on http://localhost:${PORT}`));

