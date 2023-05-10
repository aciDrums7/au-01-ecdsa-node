const express = require('express')
const app = express()
const cors = require('cors')
const port = 3042
const fs = require('fs')
const createWallet = require('./logic/createWallet')
const transferAmount = require('./logic/transferAmount')
const log = console.log

app.use(cors())
app.use(express.json())

const createDb = () => {
    let isFileAlreadyPopulated = false
    try {
        file = fs.readFileSync('db/walletsTable.json', 'utf-8')
        if (file !== '') isFileAlreadyPopulated = true
    } catch (err) {
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

app.get('/getBalance/:signatureHex', (req, res) => {
    const { signatureHex } = req.params
    walletsTable = fs.readFileSync('db/walletsTable.json', 'utf8')
    wallet = JSON.parse(walletsTable).find((recObj) => recObj.signatureHex === signatureHex)
    if (!wallet) res.status(404).send('Not Found')
    else res.json(wallet)
    res.send({ balance })
})

app.get('/getWallet/:signatureHex', (req, res) => {
    const { signatureHex } = req.params
    walletsTable = fs.readFileSync('db/walletsTable.json', 'utf8')
    wallet = JSON.parse(walletsTable).find((recObj) => recObj.signatureHex === signatureHex)
    if (!wallet) res.status(404).send('Not Found')
    else res.json(wallet)
})

app.post('/transferAmount', (req, res) => {
    // TODO: get a signature from the client-side application
    // TODO: recover the public address from the signature
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
