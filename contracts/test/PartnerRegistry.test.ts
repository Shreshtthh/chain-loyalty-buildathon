import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { parseEther } from "viem"; // Add parseEther here
import { getAddress } from "viem";


describe("PartnerRegistry", function () {
  async function deployContractsFixture() {
    const [owner, partner] = await hre.viem.getWalletClients();

    // Deploy all contracts
    const loyaltyPoints = await hre.viem.deployContract("LoyaltyPoints", [owner.account.address]);
    const partnerRegistry = await hre.viem.deployContract("PartnerRegistry", [loyaltyPoints.address, owner.account.address]);

    // Grant Admin Role to PartnerRegistry
    const adminRole = await loyaltyPoints.read.DEFAULT_ADMIN_ROLE();
    await loyaltyPoints.write.grantRole([adminRole, partnerRegistry.address]);
    
    return { loyaltyPoints, partnerRegistry, owner, partner };
  }

  it("Should allow a new user to register as a partner", async function () {
    const { partnerRegistry, loyaltyPoints, partner } = await loadFixture(deployContractsFixture);
    
    // We will try to register the 'partner' account
    const partnerAddress = partner.account.address;

    console.log(`Attempting to register partner: ${partnerAddress}`);

    // This is the transaction that is failing on the front-end
    try {
      await partnerRegistry.write.register({
        value: parseEther("0.1"), // Send the registration fee
        account: partner.account, // Simulate the transaction from the partner's wallet
      });

      // Check if the role was granted
      const minterRole = await loyaltyPoints.read.MINTER_ROLE();
      const hasRole = await loyaltyPoints.read.hasRole([minterRole, partnerAddress]);
      
      console.log(`Does partner have MINTER_ROLE? ${hasRole}`);
      expect(hasRole).to.be.true;

    } catch (e) {
      console.error("TRANSACTION FAILED WITH REASON:");
      console.error(e); // This will print the detailed revert reason
      throw e; // Re-throw to fail the test
    }
  });
});