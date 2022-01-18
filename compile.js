const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol')  // generates path to Lottery.sol file
const source = fs.readFileSync(lotteryPath, 'utf8'); // reads the source code from the Lottery.sol file

const input = {
    language: 'Solidity',
    sources: {
      'Lottery.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

   // solidity compiler compiles from source code from the number of different contracts
  const { abi: interface, evm: { bytecode: { object } } } = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Lottery.sol'].Lottery; 

  module.exports = { interface, object }; // object is the actual name of the bytecode
 