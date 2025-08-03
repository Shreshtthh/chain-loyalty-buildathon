import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

// Import and configure dotenv
import "dotenv/config";

// Get the private key from your environment variables
const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  throw new Error("Please set your PRIVATE_KEY in a .env file");
}

const config: HardhatUserConfig = {
  solidity: "0.8.28", // Make sure this matches your contract's pragma
  networks: {
    morphSepolia: {
      url: "https://rpc-quicknode-holesky.morphl2.io", // Morph Sepolia RPC URL
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: {
      morphSepolia: "anything", // API key is not required for Morph's block explorer
    },
    customChains: [
      {
        network: "morphSepolia",
        chainId: 2810,
        urls: {
          apiURL: "https://explorer-api-testnet.morphl2.io/api",
          browserURL: "https://explorer-testnet.morphl2.io",
        },
      },
    ],
  },
};

export default config;