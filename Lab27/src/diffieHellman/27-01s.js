const express = require('express');
const Controller = require('./controller/controller');
const {PORT} = require('../common/config');

const app = express();
app.use(express.json());

app.get('/', Controller.get);
app.post('/resource', Controller.resource)

app.listen(PORT, () => console.log('Server started on port', PORT));