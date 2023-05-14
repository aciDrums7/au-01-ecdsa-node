import { readFile, writeFile } from './file-manager.js'
import { WALLETS_TABLE_PATH } from './constants.js'
import createWallet from './create-wallet.js'

const log = console.log

export default async function createDb() {
    try {
        if (!(await isDbPopulated())) initializeDb()
    } catch (err) {
        writeFile(WALLETS_TABLE_PATH, '')
        initializeDb()
    }
}

async function initializeDb() {
    const msgKeyPairs = [
        {
            message: '21stCentury',
            privateKey: '248fe80eaab7194fc8675175f7baa3f6ece51aa6338f2f04d71d6b08422226cb',
        },
        {
            message: 'Schizoid',
            privateKey: 'e0ba4bcc066f8333a926915049eb87da122715be86b546efcb416c9da9f4c939',
        },
        {
            message: 'Man!',
            privateKey: '245a1f3ffa5afa11f9257c8b86f915740b2a1a5900076edc2d9ac4af465ecf10',
        },
    ]
    for (const pair of msgKeyPairs) {
        await createWallet(pair.message, pair.privateKey)
    }
}

async function isDbPopulated() {
    return (await readFile(WALLETS_TABLE_PATH)) !== '' ? true : false
}
