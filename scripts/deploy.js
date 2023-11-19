const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("Deploying");
  const lockContract = await ethers.getContractFactory("Lock");

  console.log(lockContract);
  const amountInEther = 0.00001;
  const amount = ethers.parseUnits(amountInEther.toString(), "ether");
  console.log(`This is the amount : ${amount}`);

  const lockFactory = await lockContract.deploy({ value: amount });
  console.log(`Contract deployed to ${lockFactory.target}`);

  // Specify the recipient's address here
  const recipientAddress = "0xb8a408f43a058f8d434812f385eb5cece2ea27ea";

  // Call the sendETH function with the correct recipient address
  const transactionResponse = await lockFactory.sendETH(
    recipientAddress,
    amount,
    {
      gasLimit: 500000,
    }
  );
  await transactionResponse.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
