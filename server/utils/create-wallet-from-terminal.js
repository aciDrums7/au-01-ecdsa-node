import { Input } from 'enquirer'
import createWallet from './create-wallet.js'

const askMessage = new Input({
    name: 'message to sign',
    message: 'Write the message to sign',
})

const askPrivateKey = new Input({
    name: 'private key',
    message: 'Write your private key',
})

async function runFromConsole() {
    const message = await askMessage.run()
    const privateKey = await askPrivateKey.run()
    await createWallet(message, privateKey)
}

runFromConsole()
