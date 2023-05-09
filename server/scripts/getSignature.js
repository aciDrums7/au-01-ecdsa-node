const { Input } = require('enquirer')
const { stdin } = require('process')
const { keccak256 } = require('ethereum-cryptography/keccak')
const { utf8ToBytes, toHex } = require('ethereum-cryptography/utils')
const secp = require('ethereum-cryptography/secp256k1')
const signatureList = require('../utils/signatureList')
const log = console.log

const askMessage = new Input({
    name: 'message to sign',
    message: 'Write the message to sign',
})

const askPrivateKey = new Input({
    name: 'private key',
    message: 'Write your private key',
})

const run = async () => {
    try {
        const message = await askMessage.run()
        const privateKey = await askPrivateKey.run()
        const hashedMessage = keccak256(utf8ToBytes(message))
        const [signature, recoveryBit] = await secp.sign(
            hashedMessage,
            privateKey,
            {
                recovered: true,
            }
        )
        /* const publicKeyRecovered = secp.recoverPublicKey(
            hashedMessage,
            signature,
            recoveryBit
        )
        publicKey = secp.getPublicKey(privateKey)
        log(publicKey === publicKeyRecovered) */

        signatureList.push({
            hashedMessage: hashedMessage,
            signature: signature,
            recoveryBit: recoveryBit,
        })
    } catch (error) {
        log(error)
    }
}

run()
