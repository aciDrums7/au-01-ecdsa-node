export default class Wallet {
    constructor(address, balance, hashedMessage, signature, recoveryBit) {
        this.address = address
        this.balance = balance
        this.hashedMessage = hashedMessage
        this.signature = signature
        this.recoveryBit = recoveryBit
    }
}
