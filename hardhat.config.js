require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const private_key =
  "aa62de3f5c5de102bafe19bbc908b21e3d687bf426daf49ac361d75efcbca28a";

const sepolia_url =
  "https://eth-sepolia.g.alchemy.com/v2/gYfnM2-fUz9hK-kuLqKisnmaU4U4xO8u";

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
