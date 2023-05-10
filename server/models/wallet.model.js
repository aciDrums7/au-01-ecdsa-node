class RecoveryObject {
    constructor(address, balance, hashedMessage, signatureHex, recoveryBit) {
        this.address = address
        this.balance = balance
        this.hashedMessage = hashedMessage
        this.signatureHex = signatureHex
        this.recoveryBit = recoveryBit
    }
}

module.exports = RecoveryObject
