const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.join(__dirname, '../.env')
});

module.exports = {
    PORT: process.env.PORT || 3000,
    
    optionsForRedis: {
        url: 'redis://redis-11900.c10.us-east-1-4.ec2.cloud.redislabs.com:11900',
        password: '0V0SFelrqaNxsBOinhOrHylk5weuRrWp'
    }
};