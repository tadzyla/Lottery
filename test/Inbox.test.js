const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');  // requires constructor function or class, thats why start with capital letter
// web3 is portal to ethereum network, this is how we retrieve information from the network and make changes init

const web3 = new Web3(ganache.provider());  // creates new web3 instance with Web3 constructor
// web3 library has to be given the provider, which instructs what network it has to connect to, and it has information about available accounts available for web3
// in our case provider was given by ganache-cli module
// ganache holds small testing network

const { abi, evm } = require ('../compile')
// abi - interface
// evm - bytecode

// class Car {
//     park() {
//         return 'Stopped'
//     }

//     drive() {
//         return 'Runs'
//     }
// }
// let car;

// beforeEach(() => {
//     car = new Car;
// })

// describe('Our car', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'Stopped')
//     })

//     it('can drive', () => {
//         assert.equal(car.drive(), 'Runs')
//     })
// })

let accounts;
let inbox;

beforeEach(async() => {
    // get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // deploy contract using one of the accounts
   inbox = await new web3.eth
        .Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ['hello!'] })  // tells to web3 that we want to deploy a new copy of this contract
        .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async() => {
        const message = await inbox.methods.message().call();  // call is only read-only operation
        assert.equal(message, 'hello!')
    });

    it('can change message', async() => {
        await inbox.methods.setMessage('Bye!').send({ from: accounts[0] });  // send is used to change data in a contract
        const message = await inbox.methods.message().call(); // retrieve a new message just been updated
        assert.equal(message, 'Bye!');
    });
});