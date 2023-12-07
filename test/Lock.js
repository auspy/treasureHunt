// test/YourContract.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("YourContract", function () {
  let yourContract;
  let owner;
  let receiver;

  beforeEach(async function () {
    const YourContract = await ethers.getContractFactory("Lock");
    const yourContract = await YourContract.deploy();
    await yourContract.deployed();

    [owner, receiver] = await ethers.getSigners();
  });

  it("should send ETH to the receiver", async function () {
    const amountToSend = ethers.utils.parseEther("1.0");

    // Fund the contract with some Ether
    await owner.sendTransaction({
      to: yourContract.address,
      value: amountToSend,
    });

    // Check the contract balance before sending
    const initialBalance = await ethers.getBalance(receiver.address);

    // Send ETH from the contract to the receiver
    await expect(
      yourContract
        .connect(owner)
        .sendEth(receiver.address, { value: amountToSend })
    )
      .to.emit(yourContract, "Sent")
      .withArgs(receiver.address, amountToSend);

    // Check the contract balance after sending
    const finalBalance = await ethers.getBalance(receiver.address);
    expect(finalBalance.sub(initialBalance)).to.equal(amountToSend);
  });
});
