import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import builtins from "builtin-modules";
import replace from "@rollup/plugin-replace";

import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NETWORK || "rinkeby"}` });

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
  },
  plugins: [
    resolve({ preferBuiltins: true }),
    commonjs(),
    json({ compact: true }),
    typescript(),
    replace({
      "process.env.KNIGHT_ADDR": `"${process.env.KNIGHT_ADDR}"`,
      "process.env.STAKING_ADDR": `"${process.env.STAKING_ADDR}"`,
      "process.env.REWARDS_RATE": `"${process.env.REWARDS_RATE}"`,
      preventAssignment: true,
    }),
  ],
  external: [
    ...builtins,
    "ethers",
    "web3",
    "axios",
    /^defender-relay-client(\/.*)?$/,
  ],
};
