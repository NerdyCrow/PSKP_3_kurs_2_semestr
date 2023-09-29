const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { PORT } = require('./common/config');
const { JsonUserRepository } = require('./utils/auth');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy(async (username, password, done) => {
    const user = JsonUserRepository.findUser(username);

    if (user?.password === password) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'invalid username or password' });
    }
}));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'cookie_secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'));
});

app.post('/login', passport.authenticate('local', { successRedirect: '/resource', failureRedirect: '/login' }));

app.get('/resource',
    (req, res) => {
        if (req.user) {
            console.log(req.user);
            res.send(`UserName: ${req.user.username}, password: ${req.user.password}`)
        } else {
            res.status(401).send('Пользователь не авторизован');
        }
    }
);

app.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
})

app.use((req, res) => {
    res.status(404).send('Not Found');
})

app.listen(PORT, () => console.info(`Server is running on http://localhost:${PORT}`));