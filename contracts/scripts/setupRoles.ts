import hre from "hardhat";

async function main() {

  const loyaltyPointsAddress = "0x6115dd2b7d946bdebf45c219f7d9a793d1749341";
  const partnerRegistryAddress = "0x1895742c8d1b6a31da7923c399c2cd8ce84a0852";
 

  console.log(`Getting the LoyaltyPoints contract at ${loyaltyPointsAddress}...`);
  const loyaltyPoints = await hre.viem.getContractAt(
    "LoyaltyPoints",
    loyaltyPointsAddress
  );

  console.log(`Getting the DEFAULT_ADMIN_ROLE hash...`);
  const adminRole = await loyaltyPoints.read.DEFAULT_ADMIN_ROLE();

  console.log(
    `Granting DEFAULT_ADMIN_ROLE to PartnerRegistry (${partnerRegistryAddress})...`
  );
  
  
  const tx = await loyaltyPoints.write.grantRole([adminRole, partnerRegistryAddress]);

  console.log("✅ Admin role granted successfully! Tx hash:", tx);
  console.log("Your PartnerRegistry is now fully configured and secure.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});