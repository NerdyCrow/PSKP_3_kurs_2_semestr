const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.join(__dirname, '../.env')
});

module.exports = {
    PORT: process.env.PORT || 3000,
    AUTH2_OPTIONS: {
        clientID: process.env.AUTH2_CLIENT_ID,
        clientSecret: process.env.AUTH2_CLIENT_SECRET,
        callbackURL: process.env.AUTH2_CALLBACK_URL
    },
    SESSION_OPTIONS: {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }
}
