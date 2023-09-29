const crypto = require('crypto');

function clientVerify(signContext, readStream) {
    const v = crypto.createVerify('SHA256');

    readStream.pipe(v);
    return new Promise((resolve, _) => {
        readStream.on('end', () => {
            resolve(v.verify(signContext.publicKey, signContext.sign, 'hex'));
        });
    });
}

module.exports = clientVerify;
