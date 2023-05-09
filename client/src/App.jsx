import Wallet from './Wallet'
import Transfer from './Transfer'
import './App.scss'
import { useState } from 'react'

function App() {
    const [balance, setBalance] = useState(0)
    const [address, setAddress] = useState('')
    const [signatureHex, setSignatureHex] = useState('')

    return (
        <div className="app">
            <Wallet
                signatureHex={signatureHex}
                setSignatureHex={setSignatureHex}
                balance={balance}
                setBalance={setBalance}
                address={address}
                setAddress={setAddress}
            />
            <Transfer setBalance={setBalance} address={address} />
        </div>
    )
}

export default App
