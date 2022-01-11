const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')  // generates path to Inbox.sol file
const source = fs.readFileSync(inboxPath, 'utf8'); // reads the source code from the inbox.sol file

module.exports = solc.compile(source, 1).contracts[':Inbox']  // solidity compiler compiles from source code from the number of different contracts