const { Input } = require('enquirer')
const genRecoveryObj = require('./scripts/genRecoveryObj')

const askMessage = new Input({
    name: 'message to sign',
    message: 'Write the message to sign',
})

const askPrivateKey = new Input({
    name: 'private key',
    message: 'Write your private key',
})

const runFromConsole = async () => {
    const message = await askMessage.run()
    const privateKey = await askPrivateKey.run()
    genRecoveryObj(message, privateKey)
}

runFromConsole()
