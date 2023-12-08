import { ethers } from "ethers";

const localProvider = new ethers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/gYfnM2-fUz9hK-kuLqKisnmaU4U4xO8u"
);
const private_key =
  "aa62de3f5c5de102bafe19bbc908b21e3d687bf426daf49ac361d75efcbca28a";

export const getProvider = () => {
  return localProvider;
};

export const getSigner = () => {
  const wallet = new ethers.Wallet(private_key, localProvider);
  console.log(wallet);
  const signer = wallet.connect(localProvider);

  return signer;
};

export const getContract = (address, abi) => {
  const signer = getSigner();
  const contract = new ethers.Contract(address, abi, signer);
  return contract;
};
