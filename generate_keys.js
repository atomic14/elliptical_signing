// unfortunately the built in node crypto doesn't create PEM encoded keys
// and we need PEM files for the sign and verify to work. We'll use ursa to
// generate the keys - https://www.npmjs.com/package/ursa

const EC = require('elliptic').ec;
const fs = require('fs');
const KeyEncoder = require('key-encoder');

const keyEncoder = new KeyEncoder('secp256k1');

const ec = new EC('secp256k1');

const key = ec.genKeyPair();

const privateKey = key.getPrivate('hex');
const publicKey = key.getPublic(true, 'hex');

fs.writeFileSync('public_key.hex', publicKey);
fs.writeFileSync('private_key.hex', privateKey);

console.log("Wrote PublicKey to public_key.hex");
console.log(publicKey);
console.log("\n\n");
console.log("Wrote PrivateKey to private_key.hex");
console.log(privateKey);
console.log("\n\n");


const pemPrivateKey = keyEncoder.encodePrivate(privateKey, 'raw', 'pem')
const pemPublicKey = keyEncoder.encodePublic(publicKey, 'raw', 'pem')

fs.writeFileSync('private_key.pem', pemPrivateKey);
fs.writeFileSync('public_key.pem', pemPublicKey);

console.log('Also wrote public and private keys to private_key.pem and public_key.pem');