const { ethers } = require("ethers");
const { DefenderRelaySigner, DefenderRelayProvider } = require('defender-relay-client/lib/ethers');


const ERC20_ABI =[            //ERC20 Contract ABI - Transfer Function
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


exports.handler =  function(credentials) {                       
  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
  return exports.main(signer);
}

exports.main = async function(signer) {
    const ContractAddress='0x9ab27A62130D56eFc4F8CF69717Ef3BD56103A90';           //mKNIGHT Contract Address on Rinkeby 
  	const instance = new ethers.Contract(ContractAddress, ERC20_ABI, signer);
    const RewardRate = ethers.utils.parseUnits('100');                            //100mKNIGHT tokens as the RewardRate
          
 	try {  const SendTX = await instance.transfer('0xD537D030b871BE2d5d99257bd4781a434639AB2f',RewardRate);   //Transfer mKNIGHT to the Staking Contract on Rinkeby
				return SendTX;
       }

	catch {console.log('not working')
       }
}
