import { DefenderRelaySigner } from "defender-relay-client/lib/ethers";
import { ethers } from "ethers";
import erc20 from "./erc20.json";

interface TaskParams {
  relaySigner: DefenderRelaySigner;
  knightAddress: string;
  stakingAddress: string;
  rewardRate: number;
}

export async function transferRewards({
  relaySigner,
  knightAddress,
  stakingAddress,
  rewardRate,
}: TaskParams) {
  const knight = new ethers.Contract(knightAddress, erc20, relaySigner);

  // TODO - dynamically calculate rewarads based on current balances/supplies

  const decimals = await knight.decimals();
  const rewardRateBN = ethers.utils.parseUnits(`${rewardRate}`, decimals);

  const tx = await knight.transfer(stakingAddress, rewardRateBN);
  return tx;
}
