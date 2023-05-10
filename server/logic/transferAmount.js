const fs = require('fs')

const transferAmount = (sender, recipient, amount) => {
    let isSenderFound = false
    try {
        walletsList = JSON.parse(fs.readFileSync('db/walletsTable.json', 'utf8'))
        senderUpdatedBalance = walletsList.find((wallet) => wallet.address === sender).balance -=
            amount
        if (senderUpdatedBalance < 0) throw new Error('Not enough funds!')
        isSenderFound = true
        walletsList.find((wallet) => wallet.address === recipient).balance += amount
        fs.writeFileSync('db/walletsTable.json', JSON.stringify(walletsList, null, 4), 'utf8')
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

module.exports = transferAmount
