const { ethers } = require("ethers");
const { DefenderRelaySigner, DefenderRelayProvider } = require('defender-relay-client/lib/ethers');


const Holder_ABI =[            //RewardsHolder Contract ABI
	{
		"inputs": [],
		"name": "sendRewardtoStakingContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];


exports.handler =  function(credentials) {                       //Get the credentials, don't need to touch this!
  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
  return exports.main(signer);
}

exports.main = async function(signer) {
    const ContractAddress='0x4A5B063A89a543537d8Cfbc3a705Ff4edBd01020';           //RewardsHolder Contract Address
  	const instance = new ethers.Contract(ContractAddress, Holder_ABI, signer);

 	try {  const SendTX = await instance.sendRewardtoStakingContract();
				return SendTX;
       }

	catch {console.log('not working')
       }
}
