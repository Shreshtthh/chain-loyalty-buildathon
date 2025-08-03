import hre from "hardhat";

async function main() {
  // --- IMPORTANT: PASTE YOUR DEPLOYED ADDRESSES HERE ---
  const loyaltyRewardAddress = "0x4f59f0135bd23f33d32f0d921e0d06fbe6b91018";
  const loyaltyPointsAddress = "0xb3ef80eddc7b9ab9318678dc75323df5cc16a579";
  // ----------------------------------------------------

  console.log(`Getting the LoyaltyReward contract at ${loyaltyRewardAddress}...`);
  const loyaltyReward = await hre.viem.getContractAt(
    "LoyaltyReward",
    loyaltyRewardAddress
  );

  console.log(`Transferring ownership of LoyaltyReward to ${loyaltyPointsAddress}...`);
  
  const tx = await loyaltyReward.write.transferOwnership([loyaltyPointsAddress]);

  console.log("✅ Ownership transfer transaction sent! Tx hash:", tx);
  console.log("Wait for the transaction to be confirmed on the block explorer.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});