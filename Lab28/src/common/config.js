const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path: path.resolve('..', '.env')});

module.exports = {
    PORT: process.env.PORT ?? 3000,
    REMOTE_URL: process.env.REMOTE_URL,
    USERNAME: process.env.USER_NAME,
    PASSWORD: process.env.PASSWORD,
}