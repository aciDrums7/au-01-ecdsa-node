const secp = require('ethereum-cryptography/secp256k1')
const { toHex } = require('ethereum-cryptography/utils')
const log = console.log

const privateKey = secp.utils.randomPrivateKey()
const publicKey = secp.getPublicKey(privateKey)
log('\nprivate key:', toHex(privateKey))
log('\npublic key:', toHex(publicKey), '\n')
