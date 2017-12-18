// veryfy the message with the public key
const crypto = require('crypto');
const fs = require('fs');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

// What we think the message should be
const trueMessage = "This is a message from the emergency broadcasting system\n"

// read the signature making sure to convert from a buffer to a string
let signature = fs.readFileSync('signature.hex').toString();

if(signature.indexOf('= ') !== -1) {
  signature = signature.split('= ')[1];
}

// read the public key
const publicKey = fs.readFileSync('public_key.hex').toString();
const key = ec.keyFromPublic(publicKey, 'hex');

// get the hash of the message
const hash1 = crypto.createHash('sha256');
hash1.update(trueMessage);
const msgHash = hash1.digest('hex');

// make sure we tell verify that the signature is hex encoded
const trueMessageVerified = key.verify(msgHash, signature, 'hex');

console.log('True message is verified?:', trueMessageVerified);

// A bogus message that has been messed with
const bogusMessage = "Someone messed with this message";
const hash2 = crypto.createHash('sha256');
hash2.update(bogusMessage);
const bogusHash = hash2.digest('hex');

// make sure we tell verify that the signature is hex encoded
const bogusMessageVerified = key.verify(bogusHash, signature, 'hex');

console.log('Bogus message is verified?:', bogusMessageVerified);



