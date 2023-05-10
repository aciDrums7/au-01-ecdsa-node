import { useState } from 'react'
import server from './server'

function Transfer({ address, setBalance }) {
    const [amountToSend, setAmountToSend] = useState('')
    const [recipient, setRecipient] = useState('')

    const setValue = (setter) => (evt) => setter(evt.target.value)

    async function transfer(evt) {
        evt.preventDefault()
        let formErrorMessage
        if (address === '' || recipient === '' || amountToSend === '')
            formErrorMessage = 'Fullfill the form before transfer please!'
        if(!formErrorMessage) {
            try {
                const {
                    data: { senderUpdatedBalance },
                } = await server.post(`transferAmount`, {
                    sender: address,
                    amount: parseInt(amountToSend),
                    recipient,
                })
                setBalance(senderUpdatedBalance)
                alert('Transfer completed successfully!')
            } catch (error) {
                alert(error.response.data.message)
            }
        } else {
            alert(formErrorMessage)
        }
    }

    return (
        <form className="container transfer" onSubmit={transfer}>
            <h1>Send Transaction</h1>

            <label>
                Send Amount
                <input
                    placeholder="1, 2, 3..."
                    value={amountToSend}
                    onChange={setValue(setAmountToSend)}
                ></input>
            </label>

            <label>
                Recipient
                <input
                    placeholder="Type an address, for example: 0x2"
                    value={recipient}
                    onChange={setValue(setRecipient)}
                ></input>
            </label>

            <input type="submit" className="button" value="Transfer" />
        </form>
    )
}

export default Transfer
