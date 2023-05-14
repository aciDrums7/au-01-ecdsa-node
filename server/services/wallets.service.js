import { WALLETS_TABLE_PATH } from '../utils/constants.js'
import { readFile, writeFile } from '../utils/file-manager.js'

export async function getWalletBySignature(signature) {
    return await readFile(WALLETS_TABLE_PATH).find((wallet) => wallet.signature === signature)
}

export async function transferAmount(sender, recipient, amount) {
    walletsList = JSON.parse(await readFile(WALLETS_TABLE_PATH))
    senderBalance = walletsList.find((wallet) => wallet.address === sender).balance
    if (!senderBalance) throw new Error('Sender not found!')
    else if (senderBalance - amount < 0) throw new Error('Not enough funds!')
    recipientBalance = walletsList.find((wallet) => wallet.address === recipient).balance
    if (!recipientBalance) throw new Error('Recipient not found!')
    else {
        senderBalance -= amount
        recipientBalance += amount
        writeFile(WALLETS_TABLE_PATH, walletsList)
        return senderBalance
    }
}
