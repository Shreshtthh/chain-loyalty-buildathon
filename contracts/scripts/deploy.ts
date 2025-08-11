import hre from "hardhat";
import fs from "fs";
import path from "path";
import { parseEther } from "viem";

async function main() {
  const [deployer] = await hre.viem.getWalletClients();
  const publicClient = await hre.viem.getPublicClient();
  console.log(`Deploying with account: ${deployer.account.address}`);

  // Deploy contracts
  const loyaltyPoints = await hre.viem.deployContract("LoyaltyPoints", [deployer.account.address]);
  const loyaltyReward = await hre.viem.deployContract("LoyaltyReward", [deployer.account.address]);
  const stakingVault = await hre.viem.deployContract("StakingVault", [loyaltyPoints.address, deployer.account.address]);
  const partnerRegistry = await hre.viem.deployContract("PartnerRegistry", [loyaltyPoints.address, deployer.account.address]);

  console.log("\n--- Granting Roles & Waiting for Confirmation ---");

  // Grant ADMIN_ROLE to PartnerRegistry
  const DEFAULT_ADMIN_ROLE = await loyaltyPoints.read.DEFAULT_ADMIN_ROLE();
  const adminTxHash = await loyaltyPoints.write.grantRole([DEFAULT_ADMIN_ROLE, partnerRegistry.address]);
  console.log(`Attempted to grant ADMIN_ROLE to PartnerRegistry. Tx: ${adminTxHash}`);
  await publicClient.waitForTransactionReceipt({ hash: adminTxHash });
  console.log("-> ADMIN_ROLE grant transaction confirmed.");

  // Grant MINTER_ROLE to the deployer
  const MINTER_ROLE = await loyaltyPoints.read.MINTER_ROLE();
  const minterTxHash = await loyaltyPoints.write.grantRole([MINTER_ROLE, deployer.account.address]);
  console.log(`Attempted to grant MINTER_ROLE to deployer. Tx: ${minterTxHash}`);
  await publicClient.waitForTransactionReceipt({ hash: minterTxHash });
  console.log("-> MINTER_ROLE grant transaction confirmed.");
  
  // --- Set an unlimited allowance for the admin/deployer ---
  console.log("\n--- Setting Admin Minting Allowance ---");
  // We set a very large number (1 trillion tokens) to act as an infinite allowance
  const unlimitedAllowance = parseEther("1000000000000"); 
  const allowanceTxHash = await loyaltyPoints.write.setMinterAllowance([deployer.account.address, unlimitedAllowance]);
  console.log(`Attempted to set unlimited allowance for deployer. Tx: ${allowanceTxHash}`);
  await publicClient.waitForTransactionReceipt({ hash: allowanceTxHash });
  console.log("-> Admin allowance set successfully.");

  // --- Verification Step ---
  console.log("\n--- Verifying Roles & Allowance ---");
  const deployerHasMinterRole = await loyaltyPoints.read.hasRole([MINTER_ROLE, deployer.account.address]);
  console.log(`- Does Deployer have MINTER_ROLE? ${deployerHasMinterRole ? '✅ Yes' : '❌ No'}`);
  // --- ✨ FIX: Corrected typo from minterAllowance to mintAllowance ✨ ---
  const deployerAllowance = await loyaltyPoints.read.mintAllowance([deployer.account.address]);
  console.log(`- Deployer Minting Allowance: ${deployerAllowance > 0 ? '✅ Set' : '❌ Not Set'}`);

  if (!deployerHasMinterRole || !(deployerAllowance > 0)) {
      console.error("\n❌ Verification failed. Halting script.");
      process.exit(1);
  }
  console.log("✅ All roles and allowances verified successfully.");
  
  // Other configurations
  console.log("\n--- Configuring Contracts ---");
  await loyaltyPoints.write.setRewardContract([loyaltyReward.address]);
  await loyaltyPoints.write.setStakingVault([stakingVault.address]);
  await loyaltyReward.write.transferOwnership([loyaltyPoints.address]);
  console.log("Configuration complete.");

  console.log("\n--- DEPLOYMENT COMPLETE ---");
  console.log(`✅ LoyaltyPoints deployed to: \x1b[32m${loyaltyPoints.address}\x1b[0m`);
  console.log(`✅ LoyaltyReward deployed to: \x1b[32m${loyaltyReward.address}\x1b[0m`);
  console.log(`✅ StakingVault deployed to: \x1b[32m${stakingVault.address}\x1b[0m`);
  console.log(`✅ PartnerRegistry deployed to: \x1b[32m${partnerRegistry.address}\x1b[0m`);

  // Update frontend contract addresses
  console.log("\nUpdating frontend contract addresses...");
  const addresses = {
    loyaltyPoints: loyaltyPoints.address,
    loyaltyReward: loyaltyReward.address,
    stakingVault: stakingVault.address,
    partnerRegistry: partnerRegistry.address,
    network: hre.network.name,
  };
  const addressesPath = path.join(__dirname, '..', '..', 'web-app', 'config', 'contract-addresses.json');
  try {
    fs.writeFileSync(addressesPath, JSON.stringify(addresses, null, 2));
    console.log(`✅ Addresses saved to ${addressesPath}`);
  } catch (err) {
    console.error("\n❌ Error writing addresses to file:", err);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
