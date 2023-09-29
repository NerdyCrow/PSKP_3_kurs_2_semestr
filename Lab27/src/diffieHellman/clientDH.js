const crypto = require('crypto');

class ClientDH {
    constructor(serverContext) {
        const bufPrime = Buffer.from(serverContext.prime, "hex");
        const bufGenerator = Buffer.from(serverContext.generator, "hex");
        this.dh = crypto.createDiffieHellman(bufPrime, bufGenerator);
        this.dh.generateKeys();
        this.serverPublicKey = serverContext.publicKey;
    }

    getContext() {
        return {
            prime: this.dh.getPrime().toString('hex'),
            generator: this.dh.getGenerator().toString('hex'),
            publicKey: this.dh.getPublicKey().toString('hex')
        }
    }

    getSecret() {
        return this.dh.computeSecret(Buffer.from(this.serverPublicKey, "hex"));
    }
}

module.exports = ClientDH;