const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const provider = new HDWalletProvider('saddle quantum innocent insane heavy empty supreme also report mechanic coil frown', 
'https://rinkeby.infura.io/v3/e22af3bbcdf84e54b539452ad3f22ba0');
const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy accounts from', accounts[0]);
   const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] })

    console.log('Contract deployed on', result.options.address);
    provider.engine.stop(); // prevents a hanging deployment
}

deploy();