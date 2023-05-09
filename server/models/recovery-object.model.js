class RecoveryObject {
    constructor(hashedMessage, signatureHex, recoveryBit, balance) {
        this.hashedMessage = hashedMessage
        this.signatureHex = signatureHex
        this.recoveryBit = recoveryBit
        this.balance = balance
    }
}

module.exports = RecoveryObject
