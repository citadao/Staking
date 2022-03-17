import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "defender-relay-client/lib/ethers";
import { RelayerParams } from "defender-relay-client/lib/relayer";
import { transferRewards } from "./autotask";

export async function handler(credentials: RelayerParams) {
  const provider = new DefenderRelayProvider(credentials);
  return transferRewards({
    relaySigner: new DefenderRelaySigner(credentials, provider, {
      speed: "fast",
    }),
    knightAddress: process.env.KNIGHT_ADDR,
    stakingAddress: process.env.STAKING_ADDR,
    rewardRate: parseInt(process.env.REWARDS_RATE, 10),
  });
}

// Sample typescript type definitions
type EnvInfo = {
  API_KEY: string;
  API_SECRET: string;
};

// To run locally (this code will not be executed in Autotasks)
if (require.main === module) {
  require("dotenv").config();
  const { API_KEY: apiKey, API_SECRET: apiSecret } = process.env as EnvInfo;
  handler({ apiKey, apiSecret })
    .then(() => process.exit(0))
    .catch((error: Error) => {
      console.error(error);
      process.exit(1);
    });
}
