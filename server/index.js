const express = require('express')
const app = express()
const cors = require('cors')
const port = 3042
const fs = require('fs')
const genRecoveryObj = require('./scripts/genRecoveryObj')
const log = console.log

app.use(cors())
app.use(express.json())

const initializeRecoveryObjFile = () => {
    let isFileAlreadyPopulated = false
    try {
        file = fs.readFileSync('../recoveryObjectsList.json', 'utf-8')
        if (file !== '') isFileAlreadyPopulated = true
    } catch (err) {
    } finally {
        if (!isFileAlreadyPopulated) {
            const msgPrivateKeyPairs = [
                {
                    message: '21stCentury',
                    privateKey:
                        '248fe80eaab7194fc8675175f7baa3f6ece51aa6338f2f04d71d6b08422226cb',
                },
                {
                    message: 'Schizoid',
                    privateKey:
                        'e0ba4bcc066f8333a926915049eb87da122715be86b546efcb416c9da9f4c939',
                },
                {
                    message: 'Man!',
                    privateKey:
                        '245a1f3ffa5afa11f9257c8b86f915740b2a1a5900076edc2d9ac4af465ecf10',
                },
            ]
            msgPrivateKeyPairs.forEach((pair) => {
                genRecoveryObj(
                    pair.message,
                    pair.privateKey,
                    isFileAlreadyPopulated
                )
                isFileAlreadyPopulated = true
            })
        }
    }
}

app.get('/balance/:signatureHex', (req, res) => {
    const { signatureHex } = req.params
    const balance =
        recoveryObjectsList.find(
            (recoveryObject) => recoveryObject.signatureHex === signatureHex
        ).balance || 0
    res.send({ balance })
})

app.post('/send', (req, res) => {
    const { sender, recipient, amount } = req.body

    setInitialBalance(sender)
    setInitialBalance(recipient)

    if (balances[sender] < amount) {
        res.status(400).send({ message: 'Not enough funds!' })
    } else {
        balances[sender] -= amount
        balances[recipient] += amount
        res.send({ balance: balances[sender] })
    }
})

app.listen(port, () => {
    initializeRecoveryObjFile()
    console.log(`Listening on port ${port}!`)
})

function setInitialBalance(signature) {
    if (!balances[signature]) {
        balances[signature] = 21
    }
}
