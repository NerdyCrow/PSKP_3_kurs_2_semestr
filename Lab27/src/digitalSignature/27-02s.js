const express = require('express');
const Controller = require('./controller/controller');
const {PORT} = require('../common/config');

const app = express();

app.get('/', Controller.get);

app.listen(PORT, () => console.log('Server started on port', PORT));