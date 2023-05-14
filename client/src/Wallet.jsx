import { useState } from 'react'
import server from './server'

function Wallet({ balance, setBalance, address, setAddress }) {
    const [signature, setSignature] = useState('')

    async function onChange(event) {
        const inputSignature = event.target.value
        setSignature(inputSignature)
        if (inputSignature !== '' && inputSignature.length > 100) {
            try {
                const { data: wallet } = await server.get(`/getWalletBySignature/${inputSignature}`)
                setAddress(wallet.address)
                setBalance(wallet.balance)
            } catch (err) {
                setBalance(0)
                setAddress('404 - Not Found')
                throw err
            }
        } else {
            setBalance(0)
            if (inputSignature !== '') setAddress('404 - Not Found')
            else setAddress('')
        }
    }

    return (
        <div className="container wallet">
            <h1>Your Wallet</h1>

            <label>
                Signature
                <input
                    placeholder="Type in a signature"
                    value={signature}
                    onChange={onChange}
                ></input>
            </label>

            <div>
                Address:{' '}
                {address !== '404 - Not Found' && address !== ''
                    ? `${address.slice(0, 5)}...${address.slice(-5)}`
                    : address}
            </div>

            <div className="balance">Balance: {balance}</div>
        </div>
    )
}

export default Wallet
