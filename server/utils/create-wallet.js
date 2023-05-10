const { readFile, writeFile } = require('./file-manager')
const { WALLETS_TABLE_PATH } = require('./constants')
const { keccak256 } = require('ethereum-cryptography/keccak')
const { utf8ToBytes, toHex } = require('ethereum-cryptography/utils')
const secp = require('ethereum-cryptography/secp256k1')
const Wallet = require('../models/wallet.model')
const log = console.log

async function createWallet(message, privateKey, isDbPopulated) {
    try {
        const hashedMessage = toHex(keccak256(utf8ToBytes(message)))
        const [signature, recoveryBit] = await secp.sign(hashedMessage, privateKey, {
            recovered: true,
        })
        address = toHex(secp.getPublicKey(privateKey))
        randomBalance = Math.floor(Math.random() * 100)
        recoveryObject = new Wallet(
            address,
            randomBalance,
            hashedMessage,
            toHex(signature),
            recoveryBit
        )
        initializeDb(recoveryObject, isDbPopulated)
    } catch (error) {
        throw new Error(error.message)
    }
}

function initializeDb(recoveryObject, isDbPopulated) {
    if (!isDbPopulated) {
        try {
            writeFile(
                WALLETS_TABLE_PATH,
                `[
               ${JSON.stringify(recoveryObject, null, 4)}
               ]`
            )
        } catch (error) {
            throw new Error(error.message)
        }
    } else {
        pushToDb(recoveryObject, isDbPopulated)
    }
}

function pushToDb(recoveryObject, isFileAlreadyPopulated) {
    try {
        walletsList = JSON.parse(readFile(WALLETS_TABLE_PATH))
        walletsList.push(recoveryObject)
        writeFile(WALLETS_TABLE_PATH, JSON.stringify(walletsList, null, 4))
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = createWallet
