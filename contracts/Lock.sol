// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Lock {
    uint public amount;
    address payable owner;
    address payable[] public recepient;
    address[] public participants;
    uint256 totalPrize = 0;
    address payable a;
    mapping(address => uint256) public recepientToAmount;
    mapping(address => uint256) public participantToAmount;

    event EtherReceived(address indexed sender, uint256 amount);

    // Modifier to restrict access to the owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() payable {
        owner = payable(msg.sender);
        a = payable(address(this));
    }

    function send() public payable {
        amount = 100000000000000;
        a.transfer(amount);
    }

    function prize() public view returns (uint256) {
        return totalPrize;
    }

    function sendETH(address payable receiver, uint _amount) public payable {
        require(owner == msg.sender, "Only the owner can send funds");
        require(recepient.length < 3, "You cannot get prize, sorry :( ");
        amount = _amount % (recepient.length + 1);
        receiver.transfer(amount);
        recepient.push(receiver);
        recepientToAmount[receiver] = _amount;
    }

    function getRecepientToAmount(
        address recipient
    ) external view returns (uint256) {
        return recepientToAmount[recipient];
    }

    function getAllRecepientToAmounts()
        external
        view
        returns (address[] memory, uint256[] memory)
    {
        uint length = recepient.length;
        address[] memory recipients = new address[](length);
        uint256[] memory amounts = new uint256[](length);

        for (uint i = 0; i < length; i++) {
            recipients[i] = recepient[i];
            amounts[i] = recepientToAmount[recepient[i]];
        }

        return (recipients, amounts);
    }

    // Function to receive Ether
    receive() external payable {
        emit EtherReceived(msg.sender, msg.value);
    }

    // Function that allows the owner to withdraw Ether
    function withdraw() external onlyOwner {
        // Transfer the entire contract balance to the owner
        payable(owner).transfer(address(this).balance);
    }
}
