// contracts/contracts/LoyaltyPoints.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./LoyaltyReward.sol";
import "./StakingVault.sol";

contract LoyaltyPoints is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    LoyaltyReward public loyaltyRewardContract;
    StakingVault public stakingVault;

    // --- MINTING ALLOWANCE LOGIC ---
    mapping(address => uint256) public mintAllowance;
    mapping(address => uint256) public mintedThisPeriod;
    mapping(address => uint256) public periodStartTime;
    uint256 public constant MINTING_PERIOD = 1 weeks;

    constructor(address initialOwner) ERC20("Loyalty Token", "LOYAL") {
        _grantRole(DEFAULT_ADMIN_ROLE, initialOwner);
    }
    
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        uint256 finalAmount = amount;
        if (address(stakingVault) != address(0)) {
            uint16 multiplier = stakingVault.getRewardMultiplier(to);
            finalAmount = (amount * multiplier) / 10000;
        }

        // Reset minting period if a week has passed
        if (block.timestamp >= periodStartTime[msg.sender] + MINTING_PERIOD) {
            mintedThisPeriod[msg.sender] = 0;
            periodStartTime[msg.sender] = block.timestamp;
        }
        
        // **IMPORTANT:** Check if the minter has enough allowance left for this period
        require(mintedThisPeriod[msg.sender] + finalAmount <= mintAllowance[msg.sender], "Exceeds mint allowance for period");
        
        mintedThisPeriod[msg.sender] += finalAmount;
        _mint(to, finalAmount);
    }

    function setMinterAllowance(address minter, uint256 allowance) public onlyRole(DEFAULT_ADMIN_ROLE) {
        mintAllowance[minter] = allowance;
    }

    function grantMinterRole(address minter) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, minter);
        periodStartTime[minter] = block.timestamp;
    }

    // --- Other functions (setRewardContract, setStakingVault, redeemForNft, etc.) ---
    function setRewardContract(address rewardContractAddress) public onlyRole(DEFAULT_ADMIN_ROLE) {
        loyaltyRewardContract = LoyaltyReward(rewardContractAddress);
    }

    function setStakingVault(address vaultAddress) public onlyRole(DEFAULT_ADMIN_ROLE) {
        stakingVault = StakingVault(vaultAddress);
    }

    function redeemForNft(uint256 requiredAmount) public {
        require(address(loyaltyRewardContract) != address(0), "Reward contract not set");
        require(balanceOf(msg.sender) >= requiredAmount, "Insufficient loyalty points");
        _burn(msg.sender, requiredAmount);
        loyaltyRewardContract.safeMint(msg.sender);
    }
}