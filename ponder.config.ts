import { createConfig } from "@ponder/core";
import { http } from "viem";

import { SwaplaceAbi } from "./abis/SwaplaceAbi";

export default createConfig({
  networks: {
    sepolia: {
      chainId: 11155111,
      transport: http(process.env.ALCHEMY_RPC_URL),
    },
    kakarot: {
      chainId: 1802203764,
      transport: http(process.env.KAKAROT_RPC_URL),
    },
  },
  contracts: {
    Swaplace: {
      abi: SwaplaceAbi,
      network: {
        sepolia: {
          address: "0xFA682bcE8b1dff8D948aAE9f0fBade82D28E1842",
          startBlock: 5719042,
        },
        kakarot: {
          address: "0xB317127b50b22e62637E3c333A585a8ccfd0721D",
          startBlock: 90,
        },
      },
    },
  },
});
