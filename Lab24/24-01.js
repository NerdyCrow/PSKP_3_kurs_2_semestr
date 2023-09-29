const express = require('express');
const passport = require('passport');
const session = require('express-session');
const UserDetails = require('./auth/userDetails');
const router = require('./routes/router');
const {PORT, SESSION_OPTIONS} = require('./common/config');

passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

const app = express();
app.use(session(SESSION_OPTIONS));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(PORT, () => console.info(`Server running on port ${PORT}`));
