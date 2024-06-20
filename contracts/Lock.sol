// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lock {
    address public owner;

    // Event to log successful transfers
    event EtherSent(
        address indexed _from,
        address indexed _to,
        uint256 _amount
    );

    // Modifier to ensure only the owner can execute certain functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // Constructor to set the contract owner and accept Ether during deployment
    constructor() payable {
        owner = msg.sender;
    }

    // Function to allow the owner to send Ether to a specified address
    function sendEther(address _receiver, uint256 _amount) external onlyOwner {
        require(_receiver != address(0), "Invalid receiver address");
        require(_amount > 0, "Invalid amount");

        // Send Ether to the receiver
        (bool success, ) = _receiver.call{value: _amount}("");
        require(success, "Transfer failed");

        // Emit an event to log the successful transfer
        emit EtherSent(msg.sender, _receiver, _amount);
    }

    // Function to allow the contract to receive Ether
    receive() external payable {}
}
