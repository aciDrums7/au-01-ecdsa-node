import { readFile, writeFile } from './file-manager.js'
import { WALLETS_TABLE_PATH } from './constants.js'
import { keccak256 } from 'ethereum-cryptography/keccak.js'
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils.js'
import { sign, getPublicKey } from 'ethereum-cryptography/secp256k1.js'
import Wallet from '../models/wallet.model.js'

const log = console.log
let isDbInitialized = false

export default async function createWallet(message, privateKey) {
    const hashedMessage = toHex(keccak256(utf8ToBytes(message)))
    const [signature, recoveryBit] = await sign(hashedMessage, privateKey, {
        recovered: true,
    })
    const address = toHex(getPublicKey(privateKey))
    const randomBalance = Math.floor(Math.random() * 100)
    const wallet = new Wallet(address, randomBalance, hashedMessage, toHex(signature), recoveryBit)
    if (!isDbInitialized) {
        isDbInitialized = true
        await initializeDb(wallet)
    } else await insertIntoDb(wallet)
}

async function initializeDb(wallet) {
    await writeFile(WALLETS_TABLE_PATH, `[${JSON.stringify(wallet, null, 4)}]`)
}

async function insertIntoDb(wallet) {
    // ? why log('added wallet') is written 2 times but the code write 3 times? async mystery
    const walletsList = await readFile(WALLETS_TABLE_PATH)
    walletsList.push(wallet)
    await writeFile(WALLETS_TABLE_PATH, JSON.stringify(walletsList, null, 4))
}
