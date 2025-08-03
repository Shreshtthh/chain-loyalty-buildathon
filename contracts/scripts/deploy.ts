import hre from "hardhat";

async function main() {
  const [deployer] = await hre.viem.getWalletClients();

  console.log(
    `Deploying contracts with the account: ${deployer.account.address}`
  );

  // 1. Deploy the LoyaltyPoints contract
  console.log("\nDeploying LoyaltyPoints contract...");
  const loyaltyPoints = await hre.viem.deployContract("LoyaltyPoints");
  console.log(
    `✅ LoyaltyPoints deployed to: \x1b[32m${loyaltyPoints.address}\x1b[0m`
  );

  // 2. Deploy the LoyaltyReward NFT contract
  console.log("\nDeploying LoyaltyReward contract...");
  // The NFT constructor requires the owner's address, so we pass it in.
  const loyaltyReward = await hre.viem.deployContract("LoyaltyReward", [
    deployer.account.address,
  ]);
  console.log(
    `✅ LoyaltyReward deployed to: \x1b[32m${loyaltyReward.address}\x1b[0m`
  );

  // 3. Link the two contracts together
  console.log("\nLinking contracts...");
  // Get an instance of the deployed LoyaltyPoints contract
  const pointsContract = await hre.viem.getContractAt(
    "LoyaltyPoints",
    loyaltyPoints.address
  );
  
  // Call the setRewardContract function, passing in the NFT contract's address
  const tx = await pointsContract.write.setRewardContract([
    loyaltyReward.address,
  ]);
  
  console.log("✅ Contracts linked successfully!");
  console.log("\n--- DEPLOYMENT COMPLETE ---");
  console.log("Save both contract addresses for your front-end!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});