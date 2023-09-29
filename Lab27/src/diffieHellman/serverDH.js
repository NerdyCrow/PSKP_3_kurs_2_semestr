const crypto = require('crypto');

class ServerDH {
    constructor(lengthP, generator) {
        this.dh = crypto.createDiffieHellman(lengthP, generator);
        this.dh.generateKeys();
    }

    getContext() {
        return {
            prime: this.dh.getPrime().toString('hex'),
            generator: this.dh.getGenerator().toString('hex'),
            publicKey: this.dh.getPublicKey().toString('hex')
        }
    }

    getSecret(clientContext) {
        return this.dh.computeSecret(Buffer.from(clientContext.publicKey, 'hex'));
    }
}

module.exports = ServerDH;