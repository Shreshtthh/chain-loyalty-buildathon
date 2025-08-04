// contracts/contracts/StakingVault.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingVault is Ownable {
    IERC20 public immutable loyalToken;

    struct Tier {
        uint256 requirement; // Amount of tokens required
        uint16 multiplierBps; // Reward multiplier in basis points (11000 = 1.1x)
    }

    Tier[] public tiers;
    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public tierLevel;

    constructor(address loyalTokenAddress, address initialOwner) Ownable(initialOwner) {
        loyalToken = IERC20(loyalTokenAddress);
        
        // Define the tiers
        tiers.push(Tier(0, 10000)); // Bronze: 0 tokens, 1.0x multiplier
        tiers.push(Tier(5000 * 10**18, 11000)); // Silver: 5k tokens, 1.1x multiplier
        tiers.push(Tier(25000 * 10**18, 12500)); // Gold: 25k tokens, 1.25x multiplier
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0");
        stakedBalance[msg.sender] += amount;
        updateTier(msg.sender);
        loyalToken.transferFrom(msg.sender, address(this), amount);
    }

    function unstake(uint256 amount) external {
        require(amount > 0, "Cannot unstake 0");
        require(stakedBalance[msg.sender] >= amount, "Insufficient staked balance");
        stakedBalance[msg.sender] -= amount;
        updateTier(msg.sender);
        loyalToken.transfer(msg.sender, amount);
    }
    
    function updateTier(address user) internal {
        uint256 balance = stakedBalance[user];
        for (uint i = tiers.length - 1; i >= 0; i--) {
            if (balance >= tiers[i].requirement) {
                tierLevel[user] = i;
                return;
            }
        }
    }

    function getRewardMultiplier(address user) external view returns (uint16) {
        return tiers[tierLevel[user]].multiplierBps;
    }
}