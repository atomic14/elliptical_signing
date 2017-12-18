# Setup

Clone the repository

```
git clone https://github.com/atomic14/elliptical_signing
```

and then run:

```
yarn
```

or

```
npm
```

# Generate public and private keys in PEM format

This uses the `elliptical` library to generate the public and private keys files for signing and verifying.

```
node generate_keys.js
```

This will create two files `private_key.hex` and `public_key.hex`.

# Sign a message

Uses the built in crypto node module to sign a message using the private key.

```
node sign_message.js
```

This will create a signature using the `private_key.hex` for the message `This is a message from the emergency broadcasting system` and write it to `signature.hex`

# Verify Message

Uses the build in crypto node module to verify a message using the public key.

```
node verify_message.js
```

This will read the `signature.hex` file and use the `public_key.hex` to check it against the real message and a fake message.

# Testing with openssl

```
openssl dgst -sha256 -sign private_key.pem -out signature.hex -hex test.txt
```

Now run `node verify_message.js` - the good message should still verify as the signature is the same.

Run `node sign_message.js` to generate a signature from node.

Convert the hex signature to binary using:

```
xxd -r -p signature.hex > signature.bin
```

And verify the signature using:

```
openssl dgst -sha256 -verify public_key.pem -hex -signature signature.bin test.txt
```
