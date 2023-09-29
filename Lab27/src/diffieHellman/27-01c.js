const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const axios = require('axios');
const { PORT } = require('../common/config');
const ClientDH = require('./clientDH');

async function client() {
    const { data: serverContext } = await axios.get(`http://localhost:${PORT}/`);
    const clientDH = new ClientDH(serverContext);
    const clientSecret = clientDH.getSecret(serverContext);
    const clientContext = clientDH.getContext();

    const { data } = await axios({
        method: 'post',
        url: `http://localhost:${PORT}/resource`,
        data: clientContext
    });

    let text = data.file.toString('utf8');
    fs.writeFileSync(path.join(__dirname, 'files', 'encrepted.txt'),text)
    const decipher = crypto.createDecipher('aes256', clientSecret.toString());
    const decrypted = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
    console.log('decrypted = ', decrypted);

    fs.writeFileSync(path.join(__dirname, 'files', 'fileClient.txt'), decrypted);
}

client();