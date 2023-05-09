import server from './server'
import fs from 'fs'
import * as secp from 'ethereum-cryptography/secp256k1'
import { toHex, hexToBytes } from 'ethereum-cryptography/utils'

function Wallet({
    signatureHex,
    setSignatureHex,
    balance,
    setBalance,
    address,
    setAddress,
}) {
    async function onChange(event) {
        // TODO: finish to implement the get flow
        const inputSign = event.target.value
        setSignatureHex(inputSign)
        const recoveryObj = recoveryObjectsList.find(
            (recObj) => recObj.signatureHex === inputSign
        )
        if (recoveryObj) {
            try {
                const address = await toHex(
                    secp.recoverPublicKey(
                        recoveryObj.hashedMessage,
                        recoveryObj.signatureHex,
                        recoveryObj.recoveryBit
                    )
                )
            } catch (error) {
                console.log(error)
            }
            setAddress(address)
            const {
                data: { balance },
            } = await server.get(`balance/${inputSign}`)
            setBalance(balance)
        } else {
            setBalance(0)
        }
    }

    return (
        <div className="container wallet">
            <h1>Your Wallet</h1>

            <label>
                Signature
                <input
                    placeholder="Type in a signature"
                    value={signatureHex}
                    onChange={onChange}
                ></input>
            </label>

            <div>
                Address: {address.slice(0, 5)}...{address.slice(-5)}
            </div>

            <div className="balance">Balance: {balance}</div>
        </div>
    )
}

export default Wallet
