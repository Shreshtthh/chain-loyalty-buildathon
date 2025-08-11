'use client';

import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { loyaltyPointsABI } from '../../lib/loyaltyPointsABI';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { parseEther } from 'viem';
import contractAddresses from "../../config/contract-addresses.json";

const LOYALTY_CONTRACT_ADDRESS = contractAddresses.loyaltyPoints as `0x${string}`;

export default function AdminPage() {
  const { isConnected, isConnecting } = useAccount(); // ✨ Get the isConnecting state
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  
  const { writeContract, isPending, data: hash, error } = useWriteContract();

  function handleMint() {
    if (!toAddress || !amount) {
      alert("Please enter both an address and an amount.");
      return;
    }
    writeContract({
      address: LOYALTY_CONTRACT_ADDRESS,
      abi: loyaltyPointsABI,
      functionName: 'mint',
      args: [toAddress as `0x${string}`, parseEther(amount)],
    });
  }

  // ✨ NEW: Show a loader while checking the connection
  if (isConnecting) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-orange-500"></div>
        </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
            <span className="text-4xl">🔒</span>
          </div>
          <h1 className="text-3xl font-bold">Admin Access Required</h1>
          <p className="text-muted-foreground">Please connect your wallet to access the admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center animate-glow">
              <span className="text-6xl">⚙️</span>
            </div>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-2xl text-muted-foreground">
            System administration and token management dashboard
          </p>
        </div>

        {/* Admin Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏭</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Token Minting</h3>
            <p className="text-muted-foreground">Create new LOYAL tokens for distribution</p>
          </div>

          <div className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Analytics</h3>
            <p className="text-muted-foreground">Monitor system performance and metrics</p>
          </div>

          <div className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔧</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Configuration</h3>
            <p className="text-muted-foreground">Manage system settings and parameters</p>
          </div>
        </div>

        {/* Token Minting Interface */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Token Minting
              </h2>
              <p className="text-lg text-muted-foreground">
                Mint LOYAL tokens directly to any wallet address
              </p>
            </div>

            {/* Security Notice */}
            <div className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl border border-red-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">⚠️</span>
                </div>
                <div>
                  <p className="font-semibold text-red-600">Security Notice</p>
                  <p className="text-sm text-red-600/80">Only authorized administrators can mint tokens. Use responsibly.</p>
                </div>
              </div>
            </div>

            {/* Minting Form */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="toAddress" className="text-lg font-semibold">Recipient Address</Label>
                <Input 
                  id="toAddress" 
                  placeholder="0x1234567890abcdef..." 
                  value={toAddress} 
                  onChange={(e) => setToAddress(e.target.value)}
                  className="text-lg py-6 bg-background/50 border-2 border-green-500/20 focus:border-green-500/50 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-4">
                <Label htmlFor="amount" className="text-lg font-semibold">Amount to Mint</Label>
                <div className="relative">
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder="1000" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg py-6 pr-20 bg-background/50 border-2 border-green-500/20 focus:border-green-500/50 rounded-xl"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground font-semibold">
                    LOYAL
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleMint} 
                disabled={isPending || !toAddress || !amount}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6 text-xl rounded-2xl transition-all duration-300"
                size="lg"
              >
                {isPending ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Minting Tokens...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-2xl">🏭</span>
                    <span>Mint {amount || '0'} LOYAL Tokens</span>
                  </div>
                )}
              </Button>

              {hash && (
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl">✅</span>
                    <h3 className="text-2xl font-bold text-green-600">Minting Successful!</h3>
                  </div>
                  <p className="text-green-600">Tokens have been successfully minted and transferred!</p>
                  <div className="p-3 bg-green-500/5 rounded-lg">
                    <p className="text-sm font-mono text-green-600/80 break-all">Transaction: {hash}</p>
                  </div>
                </div>
              )}
              {error && <p className="mt-4 text-center text-sm text-red-500">Error: {error.message.includes("User rejected the request") ? "Transaction rejected by user." : "An error occurred."}</p>}
            </div>
          </div>
        </div>

        {/* Admin Stats */}
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold">System Overview</h3>
          <div className="grid md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="glass-effect rounded-xl p-4">
              <p className="text-2xl font-bold text-blue-600">24/7</p>
              <p className="text-sm text-muted-foreground">System Uptime</p>
            </div>
            <div className="glass-effect rounded-xl p-4">
              <p className="text-2xl font-bold text-green-600">100%</p>
              <p className="text-sm text-muted-foreground">Transaction Success</p>
            </div>
            <div className="glass-effect rounded-xl p-4">
              <p className="text-2xl font-bold text-purple-600">∞</p>
              <p className="text-sm text-muted-foreground">Scalability</p>
            </div>
            <div className="glass-effect rounded-xl p-4">
              <p className="text-2xl font-bold text-orange-600">🔒</p>
              <p className="text-sm text-muted-foreground">Security Level</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
