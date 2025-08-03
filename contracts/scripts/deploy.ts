import hre from "hardhat";
import { formatEther } from "viem";

async function main() {
  // Get the deployer account from Hardhat's configuration
  const [deployer] = await hre.viem.getWalletClients();

  console.log(
    `Deploying contracts with the account: ${deployer.account.address}`
  );

  // Optional: Log the deployer's balance to ensure you have testnet ETH
  // const balance = await hre.viem.getPublicClient().getBalance({
    // address: deployer.account.address,
  // });
  //console.log(`Account balance: ${formatEther(balance)} ETH`);

  // Deploy the contract
  console.log("\nDeploying LoyaltyPoints contract...");
  const loyaltyPoints = await hre.viem.deployContract("LoyaltyPoints");

  // Log the deployed contract's address in a noticeable way
  console.log(
    `\n✅ LoyaltyPoints contract deployed to: \x1b[32m${loyaltyPoints.address}\x1b[0m`
  );
  console.log("Save this address! You will need it for your front-end application.");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});