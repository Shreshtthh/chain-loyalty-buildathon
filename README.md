<div align="center">
  <br />
  <h1>⛓️ Chain-Loyalty</h1>
  <p><b>A Universal Rewards & Staking Ecosystem on the Morph Network</b></p>
  <p>Submission for the Morph Consumer Buildathon 2025</p>
  <br />
</div>

> Chain-Loyalty introduces a decentralized, universal loyalty program designed to create a unified rewards ecosystem. It provides a central hub for consumers to earn, manage, and stake their points from any participating dApp on Morph, turning scattered rewards into a valuable, consolidated asset.

---

## 🚀 Live Demo & Video

- **Live dApp:** `[Link to your deployed Vercel site]`
- **Video Walkthrough:** `[Link to your Loom or YouTube demo video]`

---

## 🎯 The Problem

In the current Web3 landscape, consumer rewards are fragmented. Loyalty points are siloed within individual dApps, offering little cumulative value to the user. For businesses and developers building on new chains like Morph, attracting and retaining users is a constant challenge without powerful, built-in incentive mechanisms. This fragmentation creates a poor user experience and hinders the growth of a vibrant on-chain economy.

## ✨ Our Solution: An Ecosystem Flywheel

Chain-Loyalty solves this by creating a powerful, self-reinforcing ecosystem loop:

1.  **Consumers** are incentivized to shop at partner stores to earn universal `LOYAL` tokens.
2.  **Consumers** stake their `LOYAL` tokens in the Staking Vault to unlock reward multipliers and benefits.
3.  **Partners** gain a powerful, built-in tool to drive user engagement and retention, attracting more customers to their dApps.
4.  **The Morph Network** benefits from increased transaction volume and a sticky, interconnected ecosystem of applications.

This isn't just a dApp; it's foundational infrastructure for consumer-grade applications on Morph.

---

## 🔑 Key Features

-   **Universal Rewards Hub:** A central dashboard for users to connect their wallet, view their aggregated `LOYAL` token balance, and manage their rewards.
-   **Decentralized Partner Registry:** An on-chain system where businesses can pay a one-time fee to become official partners. This automatically grants them the `MINTER_ROLE` and a weekly allowance of `LOYAL` tokens to distribute to their customers.
-   **Tiered Staking Vault:** A sophisticated staking contract where users can lock their `LOYAL` tokens to climb through tiers (Bronze, Silver, Gold), each offering a progressively higher reward multiplier on future earnings.
-   **Role-Based Minting Control:** Utilizes OpenZeppelin's `AccessControl` for robust security. Only the contract owner (for admin purposes) and registered partners (with weekly limits) can mint new tokens, preventing inflation and abuse.
-   **Admin Superpowers:** A secure admin panel, accessible only by the contract owner, for emergency token minting and system management.
-   **Automated Deployment & Configuration:** A robust Hardhat script that deploys all contracts, links them, and correctly sets all necessary roles and permissions in a single command.

---

## 🏗️ Architecture & How It Works

The Chain-Loyalty ecosystem is powered by a suite of interconnected smart contracts working in harmony.



1.  **`LoyaltyPoints.sol` (ERC-20 Token):** The core of the ecosystem. It's an `AccessControl` ERC-20 token that manages all balances, roles (`DEFAULT_ADMIN_ROLE`, `MINTER_ROLE`), and weekly minting allowances for partners.
2.  **`PartnerRegistry.sol` (Onboarding):** The gateway for businesses. This contract handles partner registration, fee collection, and automatically calls `LoyaltyPoints` to grant the `MINTER_ROLE` and set the initial minting allowance.
3.  **`StakingVault.sol` (DeFi Engine):** The user-facing DeFi component. It securely holds staked tokens and calculates a user's reward multiplier based on their staked amount and the defined tiers. It requires the standard `approve` and `stake` flow for security.
4.  **Frontend (Next.js & wagmi):** A polished, responsive user interface that provides a seamless experience for all user actions, including checking balances, registering, staking, and unstaking.

---

## 💜 Why Morph?

Morph is the ideal platform for Chain-Loyalty, transforming it from a theoretical concept into a viable, high-performance application.

-   **Low Gas Fees:** A loyalty program involves millions of potential micro-transactions (earning points, redeeming rewards, staking). Morph's low fees make these actions economically feasible for everyday users.
-   **Fast Transaction Finality:** A seamless consumer experience requires instant gratification. Morph's speed ensures users see their rewards appear immediately after a purchase, making the system feel as responsive as a traditional Web2 application.
-   **EVM Compatibility:** Allowed for rapid development, testing, and deployment using familiar, industry-standard tools like Hardhat, Viem, and Solidity, drastically accelerating the development lifecycle.

---

## 🛠️ Tech Stack

**Blockchain:**
-   Solidity
-   Hardhat
-   OpenZeppelin Contracts
-   Viem

**Frontend:**
-   Next.js
-   React
-   TypeScript
-   wagmi
-   Tailwind CSS
-   shadcn/ui

**Deployment & Infrastructure:**
-   Vercel
-   Morph Sepolia Testnet

---

## 🏁 Getting Started (For Developers)

To get a local copy up and running, follow these simple steps.

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/your-username/chain-loyalty.git](https://github.com/your-username/chain-loyalty.git)
    cd chain-loyalty
    ```
2.  **Install dependencies for both workspaces**
    ```sh
    # In the root directory
    npm install
    # In the contracts directory
    cd contracts && npm install && cd ..
    # In the web-app directory
    cd web-app && npm install && cd ..
    ```
3.  **Set up your environment variables**
    -   In the `contracts` directory, create a `.env` file.
    -   Add your `PRIVATE_KEY` and `MORPH_SEPOLIA_RPC_URL`.
4.  **Deploy the contracts to the Morph testnet**
    ```sh
    cd contracts
    npx hardhat run scripts/deploy.ts --network morphSepolia
    ```
    This script will automatically deploy all contracts, set permissions, and update the address file for the frontend.
5.  **Run the frontend**
    ```sh
    cd web-app
    npm run dev
    ```

---

## 🛣️ Future Work & Roadmap

-   [ ] **Governance:** Allow holders of staked `LOYAL` tokens to vote on proposals, such as changing the partner registration fee or adding new staking tiers.
-   [ ] **Dynamic Rewards:** Implement an NFT-based reward system where partners can mint unique NFT vouchers that users can redeem.
-   [ ] **Partner Analytics Dashboard:** Provide a dedicated dashboard for registered partners to track how many tokens they've distributed and see user engagement metrics.
-   [ ] **Social Features:** Enable users to send `LOYAL` tokens as tips or gifts to friends.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
