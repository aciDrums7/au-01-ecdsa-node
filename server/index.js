const express = require('express')
const app = express()
const cors = require('cors')
const port = 3042
const fs = require('fs')
const createDb = require('./logic/createDb')
const transferAmount = require('./logic/transferAmount')
const log = console.log

app.use(cors())
app.use(express.json())

// TODO: move the logic to the right layer!

app.get('/getBalance/:signatureHex', (req, res) => {
    const { signatureHex } = req.params
    walletsTable = fs.readFileSync('db/walletsTable.json', 'utf8')
    wallet = JSON.parse(walletsTable).find((wallet) => wallet.signatureHex === signatureHex)
    if (!wallet) res.status(404).send('Not Found')
    else res.json(wallet)
    res.send({ balance })
})

app.get('/getWallet/:signatureHex', (req, res) => {
    const { signatureHex } = req.params
    walletsTable = fs.readFileSync('db/walletsTable.json', 'utf8')
    wallet = JSON.parse(walletsTable).find((wallet) => wallet.signatureHex === signatureHex)
    if (!wallet) res.status(404).send('Not Found')
    else res.json(wallet)
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
