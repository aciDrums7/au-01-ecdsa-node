import { useState } from 'react'
import server from './server'

function Transfer({ senderAddress, setBalance }) {
    const [amountToSend, setAmountToSend] = useState(0)
    const [recipient, setRecipient] = useState('')

    const setValue = (setter) => (evt) => setter(evt.target.value)

    let formErrorMessage

    async function transfer(evt) {
        evt.preventDefault()
        checkFormIsValid()
        if (!formErrorMessage) {
            try {
                const {
                    data: { senderUpdatedBalance },
                } = await server.post(`transferAmount`, {
                    sender: senderAddress,
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

    function checkFormIsValid() {
        if (senderAddress === '' || recipient === '' || amountToSend === '')
            formErrorMessage = 'Fullfill the form correctly before transfer please!'
        else if (senderAddress.length < 100) formErrorMessage = 'Sender address not valid!'
        else if (recipient.length < 100) formErrorMessage = 'Recipient address not valid!'
        else if (amountToSend === 0) formErrorMessage = 'Insert a valid amount!'
    }

    return (
        <form className="container transfer" onSubmit={transfer}>
            <h1>Send Transaction</h1>

            <label>
                Send Amount
                <input
                    placeholder="1, 2, 3..."
                    type="number"
                    value={amountToSend}
                    onChange={setValue(setAmountToSend)}
                ></input>
            </label>

            <label>
                Recipient's Address
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
