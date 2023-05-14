import { utils, getPublicKey } from 'ethereum-cryptography/secp256k1.js'
import { toHex } from 'ethereum-cryptography/utils.js'

const log = console.log

const privateKey = utils.randomPrivateKey()
const publicKey = getPublicKey(privateKey)
log('\nprivate key:', toHex(privateKey))
log('\npublic key:', toHex(publicKey), '\n')
