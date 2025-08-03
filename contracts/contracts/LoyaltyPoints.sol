// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./LoyaltyReward.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoyaltyPoints is ERC20, Ownable {
    // State variable to hold the address of the NFT reward contract
    LoyaltyReward public loyaltyRewardContract;

    constructor() ERC20("Loyalty Token", "LOYAL") Ownable(msg.sender) {
        // The constructor's main job is to set up the parent contracts.
    }

    /**
     * @dev Creates a specified `amount` of new tokens and assigns them to the `to` address.
     * Can only be called by the contract owner.
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Sets the address of the LoyaltyReward NFT contract.
     * Can only be called once by the contract owner.
     */
    function setRewardContract(address rewardContractAddress) public onlyOwner {
        loyaltyRewardContract = LoyaltyReward(rewardContractAddress);
    }

    /**
     * @dev Allows a user to burn a `requiredAmount` of their loyalty points
     * in exchange for one LoyaltyReward NFT.
     */
    function redeemForNft(uint256 requiredAmount) public {
        // Check if the reward contract has been set
        require(address(loyaltyRewardContract) != address(0), "Reward contract not set");
        
        // Check if the user has enough points
        require(balanceOf(msg.sender) >= requiredAmount, "Insufficient loyalty points");
        
        // Burn the user's points
        _burn(msg.sender, requiredAmount);
        
        // Tell the NFT contract to mint a reward to the user
        loyaltyRewardContract.safeMint(msg.sender);
    }
}