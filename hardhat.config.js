require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const sepolia_url = process.env.RPC;
const private_key = process.env.PRIVATE;
const etherscan_apikey = process.env.ETHERSCAN_API;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: sepolia_url,
      accounts: [private_key],
      chainId: 11155111,
      //chainId:80001
    },
  },
  etherscan: {
    apiKey: etherscan_apikey,
  },

  sourcify: {
    enabled: true,
  },
};
