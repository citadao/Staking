// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardsHolder {
    constructor (address _RelayerAddress, address _Owner, address _StakingContract, ERC20 _RewardToken) {
        RelayerAddress=_RelayerAddress;
        Owner=_Owner;
        StakingContract=_StakingContract;
        RewardToken=_RewardToken;
    }

    uint public RewardRate;   //eg. 100 KNIGHT
    address public RelayerAddress;
    address public Owner;
    address public StakingContract;
    ERC20 public RewardToken;


////View details////
    function viewRewardRate() public view returns(uint) {
        return RewardRate;
    }

    function viewRelayerAddress() public view returns(address) {
        return RelayerAddress;
    }

    function viewOwner() public view returns(address) {
        return Owner;
    }

    function viewStakingContract() public view returns(address) {
        return StakingContract;
    }

    function viewRewardToken() public view returns(ERC20, string memory) {
        return (RewardToken, RewardToken.name());
    }

    function viewRewardTokenBalance() public view returns(uint) {
        return (RewardToken.balanceOf(address(this))/10**18);
    }


////Relayer Function////
    function sendRewardtoStakingContract() public {
        require(msg.sender==RelayerAddress,'Not Relayer');
        require(RewardRate*10**18<=RewardToken.balanceOf(address(this)));  //10**18 to account for decimals
        RewardToken.transfer(StakingContract, RewardRate);
  }


////Owner Functions////
    function setRewardRate(uint _setRewardRate) public {
        require(msg.sender==Owner);
        RewardRate=_setRewardRate;
    }

    function depositRewardintoHolder(uint depositAmount) public {
        RewardToken.transferFrom(msg.sender,address(this),depositAmount);  //This requires the Holder contract to be approved
    }                                                                      //Alternatively, the Owner could send RewardTokens directly to this contract

    function emergencyWithdraw(uint withdrawAmount) public {
        require(msg.sender==Owner);
        RewardToken.transfer(Owner, withdrawAmount);
    }

    function setRelayerAddress(address _setRelayerAddress) public {
        require(msg.sender==Owner);
        RelayerAddress=_setRelayerAddress;
    }

    function setOwnerAddress(address _setOwnerAddress) public {
        require(msg.sender==Owner);
        Owner=_setOwnerAddress;
    }

    function setStakingContractAddress(address _setStakingContractAddress) public {
        require(msg.sender==Owner);
        StakingContract=_setStakingContractAddress;
    }  

    function setRewardTokenAddress(ERC20 _setRewardTokenAddress) public {
        require(msg.sender==Owner);
        RewardToken=_setRewardTokenAddress;
    }    
}
