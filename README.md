
---
# ⛓️ Chain-Loyalty

**A universal rewards and loyalty program built on the Morph Network.**

*Submission for the Morph Consumer Buildathon on DoraHacks.*

## The Problem

In the current Web3 space, consumer rewards are fragmented. Loyalty points are siloed within individual dApps, offering little cumulative value to the user. For businesses and developers building on new chains like Morph, attracting and retaining users is a constant challenge without powerful, built-in incentive mechanisms.

## Our Solution

**Chain-Loyalty** is a decentralized, universal loyalty program that creates a unified rewards ecosystem. It provides a central hub for consumers to accumulate and manage points from any participating dApp on Morph, turning scattered rewards into a valuable, consolidated asset.

* **For Consumers:** Earn points from all your favorite Morph dApps and watch them grow in one place.
* **For Developers:** A simple, powerful tool to drive user engagement and retention, creating a sticky ecosystem where everyone benefits.

---
## 🎬 Live Demo & Video

* **Live dApp:** [Link to your deployed Vercel site]
* **Video Walkthrough:** [Link to your Loom or YouTube demo video]

---
## ✨ How It Works (User Journey)

1.  **Shop & Earn:** Users interact with partner dApps (e.g., make a purchase at a store, swap on a DEX).
2.  **Get Rewarded:** The dApp seamlessly mints `$LOYAL` tokens directly to the user's wallet as a reward.
3.  **Track & Redeem:** Users visit the Chain-Loyalty Hub to see their total `$LOYAL` balance aggregated from all sources and view exclusive rewards they can claim with their points.

## 🚀 Key Features

* **Universal Rewards Token:** A standard ERC-20 token (`$LOYAL`) serves as the backbone of the rewards ecosystem.
* **Centralized Rewards Hub:** A clean, user-friendly dashboard for users to connect their wallet and instantly see their points balance.
* **Seamless Integration:** A simple framework for any dApp on Morph to integrate and start rewarding its users (demonstrated with our mock partner stores).
* **Secure Admin Minting:** An owner-only `mint` function ensures that only approved partner dApps can distribute points, maintaining the integrity of the reward system.

---
## 💜 Why Morph?

Morph is the ideal platform for Chain-Loyalty for three key reasons:

1.  **Low Gas Fees:** A loyalty program involves millions of small transactions (earning and redeeming points). Morph's low fees make these micro-transactions economically feasible.
2.  **Fast Transactions:** A seamless user experience requires instant rewards. Morph's speed ensures users see their points appear immediately after an action.
3.  **EVM Compatibility:** Allowed for rapid development and testing using familiar, industry-standard tools like Hardhat, Viem, and Solidity.

---
## 🛠️ Tech Stack

* **Blockchain:** Morph Testnet (Sepolia)
* **Smart Contracts:** Solidity, Hardhat, OpenZeppelin
* **Front-End:** Next.js, React, TypeScript
* **Web3:** wagmi, Viem, RainbowKit
* **Styling:** Tailwind CSS, shadcn/ui

---


