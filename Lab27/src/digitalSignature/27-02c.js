const axios = require('axios');
const fs = require('fs');
const {PORT} = require('../common/config');

const clientVerify = require('./utils/clientVerify');
const rs = fs.createReadStream('./files/file.txt');

(async function client() {
    try {
        const {data: signContext} = await axios.get(`http://localhost:${PORT}/`);
      
        const result = await clientVerify(signContext, rs)
        result
            ? console.log('Signature verified = ', signContext)
            : console.log('Invalid signature');
    } catch (e) {
        console.error(e.message)
    }
})();
