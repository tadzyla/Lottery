const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, object } = require('./compile');

const provider = new HDWalletProvider('saddle quantum innocent insane heavy empty supreme also report mechanic coil frown', 
'https://rinkeby.infura.io/v3/e22af3bbcdf84e54b539452ad3f22ba0');
// hdwalletprovider is a module which connect to some network and unlocks account
// it is speciefied tat provider shouyld connect to infura node

const web3 = new Web3(provider); // preconfigured to connect to rinkeby network

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy accounts from', accounts[0]);

   const result = await new web3.eth.Contract(interface)
    .deploy({ data: object })
    .send({ gas: '1000000', from: accounts[0] })

   console.log('Contract deployed on', result.options.address);
    provider.engine.stop(); // prevents deployment from hanging in the terminal
}

deploy();