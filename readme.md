## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

Public Key Cryptography has been incorporated. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

I tried to organize the project as clean as possible, any feedback would be really appreciated!
Thank you very much for your time, I hope you'll enjoy it :)

### Video instructions

For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node server` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### Key Pair

To get a new key pair (useful to create a new wallet, for example), follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm run create-key-pair`
3. Copy from the console your new key pair! (They're not saved anywhere)

### New Wallet

At startup, the project will autocreate and populate a json file (simulating the db/blockchain)
with 3 default wallets. If you want to create a new one, follow these steps:

1. Run the server, instructions above ⬆️
2. Open a terminal within the `/server` folder
3. Run `npm run create-wallet` and insert a message to sign with your own private key
4. Open the `../server/db/wallets-table.json` file, your new wallet is the last object in the list
5. Use it to interact with the other wallets! 🔥

### Thank You Alchemy University Team for these FANTASTIC but FREE resources, keep going! 🙏
