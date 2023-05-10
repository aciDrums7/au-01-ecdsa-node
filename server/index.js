const express = require('express')
const app = express()
const cors = require('cors')
const port = 3042
const createDb = require('./utils/create-db')
const { getWalletBySignature, transferAmount } = require('./services/wallets.service')
const log = console.log

app.use(cors())
app.use(express.json())

// TODO: move the logic to the right layer!

app.get('/getWallet/:signatureHex', (req, res) => {
    const { signatureHex } = req.params
    try {
        wallet = getWalletBySignature(signatureHex)
        res.json(wallet)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

app.post('/transferAmount', (req, res) => {
    const { sender, recipient, amount } = req.body
    try {
        senderUpdatedBalance = transferAmount(sender, recipient, amount)
        res.send({ senderUpdatedBalance })
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
})

app.listen(port, () => {
    createDb()
    console.log(`Listening on port ${port}!`)
})
