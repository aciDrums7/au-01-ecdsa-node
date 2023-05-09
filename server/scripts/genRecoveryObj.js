const fs = require('fs')
const { keccak256 } = require('ethereum-cryptography/keccak')
const { utf8ToBytes, toHex } = require('ethereum-cryptography/utils')
const secp = require('ethereum-cryptography/secp256k1')
const RecoveryObject = require('../models/recovery-object.model')
const log = console.log

const genRecoveryObj = async (message, privateKey, isFileAlreadyPopulated) => {
    try {
        const hashedMessage = keccak256(utf8ToBytes(message))
        const [signature, recoveryBit] = await secp.sign(
            hashedMessage,
            privateKey,
            {
                recovered: true,
            }
        )
        randomBalance = Math.floor(Math.random() * 100)
        recoveryObject = new RecoveryObject(
            hashedMessage,
            toHex(signature),
            recoveryBit,
            randomBalance
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
                '../recoveryObjectsList.json',
                `[
               ${JSON.stringify(recoveryObject, null, 4)}
               ]`,
                'utf8'
            )
        } catch (err) {
            throw err
        }
    } else {
        pushToFile(recoveryObject, isFileAlreadyPopulated)
    }
}

const pushToFile = (recoveryObject, isFileAlreadyPopulated) => {
    try {
        recoveryObjectFile = fs.readFileSync(
            '../recoveryObjectsList.json',
            'utf8'
        )
        recoveryObjectsList = JSON.parse(recoveryObjectFile)
        recoveryObjectsList.push(recoveryObject)
        fs.writeFileSync(
            '../recoveryObjectsList.json',
            JSON.stringify(recoveryObjectsList, null, 4),
            'utf-8'
        )
    } catch (err) {
        throw err
    }
}

module.exports = genRecoveryObj
