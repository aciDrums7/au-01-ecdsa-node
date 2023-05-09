const { secp256k1 } = require('ethereum-cryptography/secp256k1')
const { toHex } = require('ethereum-cryptography/utils')
const log = console.log

const privateKey = secp256k1.utils.randomPrivateKey()

const publicKey = secp256k1.getPublicKey(privateKey)

log('\nprivate key:', toHex(privateKey), '\n')

log('public key:', toHex(publicKey))
