import express, { json } from 'express'
const app = express()
import cors from 'cors'
const port = 3042
import createDb from './utils/create-db.js'
import { getWalletBySignature, transferAmount } from './services/wallets.service.js'
const log = console.log

app.use(cors())
app.use(json())

app.get('/getWalletBySignature/:signature', async (req, res) => {
    const { signature } = req.params
    try {
        wallet = await getWalletBySignature(signature)
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

app.listen(port, async () => {
    try {
        await createDb()
        console.log(`Listening on port ${port}!`)
    } catch (err) {
        throw err
    }
})
