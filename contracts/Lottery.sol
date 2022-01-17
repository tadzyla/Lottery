// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Lottery {
    address public manager;
    address[] public players;

    function ManagerAddress() public {
        manager = msg.sender;            // msg object is available globally in any function that runs in the contract
    }

    function enter() public payable {
        require(msg.value > 0.1 ether);
        players.push(msg.sender);            // player who is sending some eth is recorder in players array
    }

    function random() private view returns (uint){
       return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));  // large random number generator
    }

    function pickWinner() public onlyManager {
        
       uint index = random() % players.length;
       payable(players[index]).transfer(address(this).balance);
       players = new address[](0);             // resets list of players and creates new dinamic array
    }

    modifier onlyManager() {                 // modifier can be made to save repeated code when needed 
                                            // behind the scene the main code is placed where the underscore is a "little" target
        require(msg.sender == manager);     // this code enforce, hat nobody can call pickWinner
        _;
    }

    function getPlayers() public view returns(address[] memory) {
        return players;
    }
}