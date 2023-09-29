require('dotenv').config()
const express = require('express');
const app = express();
const router = require('./routes/Router');
const sequelize = require('./DB')

const PORT = 3000
console.log(process.env.DATABASE);
app.use(express.json());
app.use(express.static(__dirname + "/views"))
app.get('/', (req, res) => { res.sendFile(__dirname + "/views/index.html") })
app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        app.listen(PORT, () => { console.log(`server on port ${PORT}`) })


    } catch (e) {
        console.log(e);
    }
}
start()