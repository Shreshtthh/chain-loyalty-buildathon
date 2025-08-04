// contracts/contracts/PartnerRegistry.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./LoyaltyPoints.sol";

contract PartnerRegistry is Ownable {
    LoyaltyPoints private _loyaltyPointsContract;
    mapping(address => bool) public isPartner;

    uint256 public registrationFee = 0.1 ether;
    // Default weekly allowance of 10,000 tokens (with 18 decimals)
    uint256 public defaultWeeklyAllowance = 10000 * (10 ** 18);

    constructor(address loyaltyPointsAddress, address initialOwner) Ownable(initialOwner) {
        _loyaltyPointsContract = LoyaltyPoints(loyaltyPointsAddress);
    }

    function register() external payable {
        require(msg.value >= registrationFee, "Insufficient registration fee");
        isPartner[msg.sender] = true;
        
        // Grant the Minter Role
        _loyaltyPointsContract.grantMinterRole(msg.sender);
        
        // Set their weekly minting budget
        _loyaltyPointsContract.setMinterAllowance(msg.sender, defaultWeeklyAllowance);
    }

    function setRegistrationFee(uint256 newFee) public onlyOwner {
        registrationFee = newFee;
    }

    function setDefaultAllowance(uint256 newAllowance) public onlyOwner {
        defaultWeeklyAllowance = newAllowance;
    }

    function withdrawFees() public onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
}