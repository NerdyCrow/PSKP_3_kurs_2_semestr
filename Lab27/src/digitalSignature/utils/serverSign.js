const crypto = require('crypto');

async function serverSign(readStream) {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
    });

    const s = crypto.createSign('SHA256');
    readStream.pipe(s); 

    return new Promise((resolve, _) => {
        readStream.on('end', () => {
            resolve({
                sign: s.sign(privateKey).toString('hex'),
                publicKey: publicKey
            });
        });
    })
}

module.exports = serverSign;
