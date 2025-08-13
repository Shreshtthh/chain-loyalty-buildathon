# ⛓ Chain-Loyalty Protocol
**A decentralized and permissionless "Loyalty as a Service" (LaaS) protocol for the Morph ecosystem.**

*Submission for the Morph Consumer Buildathon on DoraHacks.*

![Morph](https://img.shields.io/badge/Built%20on-Morph-purple)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-blue)

---

##  Demo & Live Links

* **Live dApp URL:** [Chain-Loyalty](https://chain-loyalty-buildathon.vercel.app/)
* **Video Walkthrough:** [Morph's Consumer Buildathon](https://www.youtube.com/watch?v=lQLeAu6YWjU)

---

## The Problem

New blockchain ecosystems like Morph face a cold start problem. How do you incentivize users to stay and dApps to build?

* **For dApp Developers (like Ben):** Ben is building a DeFi app on Morph. He wants to reward his most loyal users but lacks the time and deep Solidity expertise to create a secure, engaging, and multi-faceted loyalty system from scratch.
* **For Users (like Priya):** Priya is a new Morph user. Her on-chain activity is fragmented. Her loyalty to the apps she uses is unrewarded and siloed, giving her little reason to stick with one dApp over another.

Chain-Loyalty solves both of their problems with a single, open protocol.

---

## Our Solution: Loyalty as a Service

Chain-Loyalty is a suite of smart contracts that provides any developer on Morph the tools to launch a sophisticated, on-chain loyalty program in minutes, without writing a single line of Solidity.

* **For Ben (The Developer):** He can use our self-service Partner Portal to register his dApp, pay a small registration fee, and immediately gain the ability to mint and distribute `$LOYAL` reward tokens to his users.
* **For Priya (The Consumer):** She can earn `$LOYAL` tokens from all participating partner dApps, stake her tokens for reward multipliers, and redeem them for exclusive, on-chain NFT assets, turning her loyalty into something she truly owns.



---

##  Architecture Overview

The protocol operates through a simple, four-step flow:

1.  **Partner Registration:** `PartnerRegistry.sol` → New dApps pay a fee to register and are granted a `MINTER_ROLE`.
2.  **Token Distribution:** `LoyaltyPoints.sol` → Registered partners can mint `$LOYAL` tokens to their users as rewards.
3.  **Staking & Tiers:** `StakingVault.sol` → Users stake their `$LOYAL` tokens to unlock reward multipliers across the ecosystem.
4.  **NFT Redemption:** `LoyaltyReward.sol` → Users burn their `$LOYAL` tokens to redeem exclusive NFT assets, completing the economic loop.

---

##  Scalability

Built specifically for Morph's high-throughput, low-cost environment:

* **Optimized Gas Usage:** The protocol utilizes a role-based permission system (`AccessControl`) which is more gas-efficient for the frequent minting operations required in a loyalty system.
* **Event-Driven Architecture:** The smart contracts emit events for all major actions (mints, stakes, redemptions), allowing for efficient off-chain indexing and data aggregation for features like the partner analytics dashboard.

---

##  Tokenomics & Sustainability

* **Partner Registration Fees:** The `0.1 ETH` fee required for new partners to join the network directly funds ongoing protocol development and maintenance.
* **Network Effects:** As more partners join, the utility of the `$LOYAL` token increases for all users, creating a powerful network effect that attracts more users and, in turn, more partners.

---

## Competitive Advantage

* **vs. Web2 Loyalty (e.g., Airline Miles):** Chain-Loyalty gives users **true ownership** of their rewards as on-chain assets (ERC20s and NFTs), which are interoperable and can be traded on open markets.
* **vs. Web3 Task Platforms (e.g., Galxe):** While excellent for one-off airdrop tasks, Chain-Loyalty is designed for **deep, ongoing e-commerce and DeFi loyalty**, creating sustainable, long-term user retention for dApps.

---

##  Future Vision

* **DAO Governance:** Empowering `$LOYAL` token holders to vote on key protocol parameters like registration fees and new reward tiers.
* **Cross-Chain Loyalty Bridge:** Expanding the protocol to other L2s, allowing for a truly interoperable rewards experience across Web3.
* **AI-Powered Recommendations:** An engine that suggests to users the most efficient way to earn points for a reward they want, based on their on-chain behavior.

---

##  Deployed Contracts (Morph Testnet)

* **LoyaltyPoints:** `[0x000b045753c128b4f209f03f4301d69a6869639a]`
* **LoyaltyReward:** `[0x987b230af8316ec294b23445b90986a66a9612ad]`
* **StakingVault:** `[0x58bbfd4711baf127c106e91cb55810f5453e3d54]`
* **PartnerRegistry:** `[0xc3bd3beef6e621cdea9ed1c0e14081688e7fdff0]`

---

##  Getting Started

### Prerequisites
* Node.js v18+
* MetaMask browser extension

### Quick Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Shreshtthh/chain-loyalty-buildathon/
    cd chain-loyalty
    ```
2.  **Install dependencies:**
    * For contracts: `cd contracts && npm install`
    * For the web app: `cd ../web-app && npm install`
3.  **Run the dApp locally:**
    ```bash
    cd web-app && npm run dev
    ```
