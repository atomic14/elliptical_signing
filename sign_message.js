// see - https://nodejs.org/api/crypto.html#crypto_diffiehellman_getpublickey_encoding
const crypto = require('crypto');
const fs = require('fs');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

// sign a message with the private key
const message = "This is a message from the emergency broadcasting system\n"

// read the private key
const privateKey = fs.readFileSync('private_key.hex').toString();
const key = ec.keyFromPrivate(privateKey, 'hex');

// sign the message
const hash = crypto.createHash('sha256');
hash.update(message);
const msgHash = hash.digest('hex');

var signatureHex = key.sign(msgHash).toDER('hex');
console.log(signatureHex);

// save it to file
fs.writeFileSync('signature.hex', signatureHex);
console.log('Wrote signature to signature.hex');
