const { readFile, writeFile } = require('./file-manager')
const { WALLETS_TABLE_PATH } = require('./constants')
const createWallet = require('./create-wallet')

function createDb() {
    let isFileAlreadyPopulated = false
    try {
        walletsTable = readFile(WALLETS_TABLE_PATH)
        if (walletsTable !== '') isFileAlreadyPopulated = true
    } catch (error) {
        writeFile(WALLETS_TABLE_PATH, '')
    } finally {
        if (!isFileAlreadyPopulated) {
            const msgPrivateKeyPairs = [
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
            msgPrivateKeyPairs.forEach((pair) => {
                createWallet(pair.message, pair.privateKey, isFileAlreadyPopulated)
                isFileAlreadyPopulated = true
            })
        }
    }
}

module.exports = createDb
