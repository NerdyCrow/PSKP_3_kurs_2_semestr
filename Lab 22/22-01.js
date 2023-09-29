const fs = require('fs');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const BasicStrategy = require('passport-http').BasicStrategy;

const PORT = 3000


const users = require('./users.json');

function verifyUser(username, password) {
    const user = findUser(username);

    return user?.password === password;
}

function findUser(username) {
    return users.find(user => user.username === username);
}


passport.use(new BasicStrategy((username, password, done) => {
    if (!verifyUser(username, password)) {
        return done(null, false, { message: 'incorrect username or password' });
    }

    return done(null, username);
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

app.get('/login', (req, res, next) => {
    console.log('login');
    if (req.session.logout && req.headers['authorization']) {
        req.session.logout = false;
        delete req.headers['authorization'];
    }
    next();
},
    passport.authenticate('basic', { session: false, successRedirect: '/resource' }),
);

app.get('/resource',

    passport.authenticate('basic', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        console.log('resource');
        fs.createReadStream('./static/index.html').pipe(res);
    })

app.get('/logout', (req, res) => {
    console.log('logout');
    req.session.logout = true;
    res.redirect('/login')
}
)

app.use((req, res) => {
    res.status(404).send('Not Found');
})

app.listen(PORT, () => console.info(`Server is running on http://localhost:${PORT}`));

