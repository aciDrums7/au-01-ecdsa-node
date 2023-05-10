import { useState } from 'react'
import server from './server'

function Wallet({ balance, setBalance, address, setAddress }) {
    const [signatureHex, setSignatureHex] = useState('')

    async function onChange(event) {
        const inputSign = event.target.value
        setSignatureHex(inputSign)
        if (inputSign !== '') {
            try {
                const { data: wallet } = await server.get(
                    `/getWallet/${inputSign}`
                )
                setAddress(wallet.address)
                setBalance(wallet.balance)
            } catch (err) {
                setBalance(0)
                setAddress('404 - Not Found')
                throw err
            }
        } else {
            setAddress('')
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
                Address:{' '}
                {address !== '404 - Not Found' && address !== ''
                    ? (`${address.slice(0, 5)}...${address.slice(-5)}`)
                    : (address)}
            </div>

            <div className="balance">Balance: {balance}</div>
        </div>
    )
}

export default Wallet
