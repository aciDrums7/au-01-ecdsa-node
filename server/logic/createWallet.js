const fs = require('fs')
const { keccak256 } = require('ethereum-cryptography/keccak')
const { utf8ToBytes, toHex } = require('ethereum-cryptography/utils')
const secp = require('ethereum-cryptography/secp256k1')
const RecoveryObject = require('../models/wallet.model')
const log = console.log

const createWallet = async (message, privateKey, isFileAlreadyPopulated) => {
    try {
        const hashedMessage = toHex(keccak256(utf8ToBytes(message)))
        const [signature, recoveryBit] = await secp.sign(hashedMessage, privateKey, {
            recovered: true,
        })
        address = toHex(secp.getPublicKey(privateKey))
        randomBalance = Math.floor(Math.random() * 100)
        recoveryObject = new RecoveryObject(
            address,
            randomBalance,
            hashedMessage,
            toHex(signature),
            recoveryBit
        )
        createOrInitializeFile(recoveryObject, isFileAlreadyPopulated)
    } catch (error) {
        throw error
    }
}

const createOrInitializeFile = (recoveryObject, isFileAlreadyPopulated) => {
    if (!isFileAlreadyPopulated) {
        try {
            fs.writeFileSync(
                './db/walletsTable.json',
                `[
               ${JSON.stringify(recoveryObject, null, 4)}
               ]`,
                'utf8'
            )
        } catch (err) {
            throw err
        }
    } else {
        pushToDb(recoveryObject, isFileAlreadyPopulated)
    }
}

const pushToDb = (recoveryObject, isFileAlreadyPopulated) => {
    try {
        recoveryObjectFile = fs.readFileSync('./db/walletsTable.json', 'utf8')
        walletsTable = JSON.parse(recoveryObjectFile)
        walletsTable.push(recoveryObject)
        fs.writeFileSync('./db/walletsTable.json', JSON.stringify(walletsTable, null, 4), 'utf-8')
    } catch (err) {
        throw err
    }
}

module.exports = createWallet
