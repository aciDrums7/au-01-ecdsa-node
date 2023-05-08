const express = require('express')
const app = express()
const cors = require('cors')
const port = 3042

app.use(cors())
app.use(express.json())

const balances = {
    '02540499078c979a7e55b098e53960778349a12be84ba68ce6b65318ef0e3a2e62': 100,
    '026f76ee9c35fb47de90c5c6b11a826977ffd57b14f09d5c25717e7c93ad0b91ce': 50,
    '02bc648abd8922f8b56ecb8843c557aa44a1ac690b54e3f58300d91741c8d0a2a0': 75,
}

app.get('/balance/:address', (req, res) => {
  // TODO: get a signature from the client-side application
  // TODO: recover the public address form the signature
    const { address } = req.params
    const balance = balances[address] || 0
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
    console.log(`Listening on port ${port}!`)
})

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0
    }
}
