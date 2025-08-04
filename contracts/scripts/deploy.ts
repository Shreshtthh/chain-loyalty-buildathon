import hre from "hardhat";

async function main() {
  const [deployer] = await hre.viem.getWalletClients();
  console.log(`Deploying with account: ${deployer.account.address}`);

  
  const loyaltyPoints = await hre.viem.deployContract("LoyaltyPoints", [deployer.account.address]);
  
  const loyaltyReward = await hre.viem.deployContract("LoyaltyReward", [deployer.account.address]);

  const stakingVault = await hre.viem.deployContract("StakingVault", [loyaltyPoints.address, deployer.account.address]);
  
  const partnerRegistry = await hre.viem.deployContract("PartnerRegistry", [loyaltyPoints.address, deployer.account.address]);
  
  
  console.log("\nConfiguring contracts...");
  await loyaltyPoints.write.setRewardContract([loyaltyReward.address]);
  await loyaltyPoints.write.setStakingVault([stakingVault.address]);
  await loyaltyReward.write.transferOwnership([loyaltyPoints.address]);
  console.log("Configuration complete.");

  
  console.log("\n--- DEPLOYMENT COMPLETE ---");
  console.log(`✅ LoyaltyPoints deployed to: \x1b[32m${loyaltyPoints.address}\x1b[0m`);
  console.log(`✅ LoyaltyReward deployed to: \x1b[32m${loyaltyReward.address}\x1b[0m`);
  console.log(`✅ StakingVault deployed to: \x1b[32m${stakingVault.address}\x1b[0m`);
  console.log(`✅ PartnerRegistry deployed to: \x1b[32m${partnerRegistry.address}\x1b[0m`);
  console.log("\nSave these addresses!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});