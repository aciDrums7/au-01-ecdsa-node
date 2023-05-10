const { WALLETS_TABLE_PATH } = require('../utils/constants')
const { readFile, writeFile } = require('../utils/file-manager')

function getWalletBySignature(signatureHex) {
    wallet = JSON.parse(readFile(WALLETS_TABLE_PATH)).find(
        (wallet) => wallet.signatureHex === signatureHex
    )
    if (!wallet) throw new Error('Wallet not found!')
    return wallet
}

function transferAmount(sender, recipient, amount) {
    let isSenderFound = false
    try {
        walletsList = JSON.parse(readFile(WALLETS_TABLE_PATH))
        senderUpdatedBalance = walletsList.find((wallet) => wallet.address === sender).balance -=
            amount
        if (senderUpdatedBalance < 0) throw new Error('Not enough funds!')
        isSenderFound = true
        walletsList.find((wallet) => wallet.address === recipient).balance += amount
        writeFile(WALLETS_TABLE_PATH, JSON.stringify(walletsList, null, 4))
        return senderUpdatedBalance
    } catch (error) {
        let errorMessage
        if (error.message === 'Not enough funds!') errorMessage = error.message
        else {
            if (!isSenderFound) errorMessage = 'Sender wallet not found!'
            else errorMessage = 'Recipient wallet not found!'
        }
        throw new Error(errorMessage)
    }
}

module.exports = {
    transferAmount,
    getWalletBySignature,
}
