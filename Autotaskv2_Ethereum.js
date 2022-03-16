const { ethers } = require("ethers");
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers");

const ERC20_ABI = [
  //ERC20 Contract ABI - Transfer Function
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

exports.handler = function (credentials) {
  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider, {
    speed: "fast",
  });
  return exports.main(signer);
};

exports.main = async function (signer) {
  const KNIGHTContractAddress = "0x3541A5C1b04AdABA0B83F161747815cd7B1516bC"; //KNIGHT Contract Address on Ethereum
  const instance = new ethers.Contract(
    KNIGHTContractAddress,
    ERC20_ABI,
    signer
  );
  const RewardRate = ethers.utils.parseUnits(
    "////Insert Reward Amount Here////"
  ); //eg. 100 KNIGHT tokens as the RewardRate
  const StakingContractAddress = "////Insert Address Here////"; //Staking Contract Address on Ethereum

  try {
    const SendTX = await instance.transfer(StakingContractAddress, RewardRate); //Transfer KNIGHT to the Staking Contract on Rinkeby
    return SendTX;
  } catch {
    console.log("not working");
  }
};
