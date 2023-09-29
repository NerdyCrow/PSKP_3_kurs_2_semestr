const fs = require('fs');
const path = require('path');
const serverSign = require('../utils/serverSign');

class Controller {
    static async get(req, res) {
        try {
            const readStream = fs.createReadStream(path.join(__dirname, '../files/file.txt'));
           const content = fs.readFileSync(path.join(__dirname, '../files/file.txt'));

            console.log(content.toString());
            const signContext = await serverSign(readStream);

            res.json(signContext);
        } catch (e) {
            res.status(409).json({message: 'error: 409'});
        }
    }
}

module.exports = Controller;