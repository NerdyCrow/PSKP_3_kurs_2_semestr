const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ServerDH = require('../serverDH');

class Controller {
    static serverDH;

    static get(req, res) {
        Controller.serverDH = new ServerDH(1024, 3);
        const serverContext = Controller.serverDH.getContext();

        return res.json(serverContext)
    }

    static resource(req, res) {
        const clientContext = req.body;
        if (!clientContext) {
            res.status(409).json({ message: 'error: 409' });
        }

            const serverSecret = Controller.serverDH.getSecret(clientContext);

            const cipher = crypto.createCipher('aes256', serverSecret.toString());
            const text = fs.readFileSync(path.join(__dirname, '../files/file.txt'), { encoding: 'utf8' });
            const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
            console.log('encrypted = ', encrypted);

            res.json({ file: encrypted });
    }
}

module.exports = Controller;