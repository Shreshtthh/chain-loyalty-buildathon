// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title LoyaltyPoints
 * @dev This is the core smart contract for the Chain-Loyalty project.
 * It creates a standard ERC-20 token named "Loyalty Token" (LOYAL).
 * It includes a special 'mint' function that can only be called by the contract owner.
 * This ensures that only our official partner stores (simulated via our admin panel)
 * can create and distribute new loyalty points to users.
 */
contract LoyaltyPoints is ERC20, Ownable {
    /**
     * @dev Sets the initial values for the token and transfers ownership to the deployer.
     * The ERC20 constructor is called with the token's name and symbol.
     * The Ownable constructor is called with the initial owner's address (msg.sender).
     */
    constructor() ERC20("Loyalty Token", "LOYAL") Ownable(msg.sender) {
        // The contract is initialized with 0 tokens.
        // Points are only created when the owner calls the mint function.
    }

    /**
     * @dev Creates a specified `amount` of new tokens and assigns them to the `to` address.
     *
     * Requirements:
     * - This function can only be called by the contract owner (see the 'onlyOwner' modifier).
     * This is the central security mechanism for our rewards system.
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}