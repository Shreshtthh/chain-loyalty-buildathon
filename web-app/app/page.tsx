// web-app/app/page.tsx
'use client';
import { useAccount, useBalance, useWriteContract } from 'wagmi';
import { Button } from '@/components/ui/button';
import { formatEther, parseEther } from 'viem';
import { loyaltyPointsABI } from '@/lib/loyaltyPointsABI';
import contractAddresses from "../config/contract-addresses.json";

const LOYALTY_CONTRACT_ADDRESS = contractAddresses.loyaltyPoints as '0x${string0}';

export default function HomePage() {
  const { address, isConnected } = useAccount();
  const { data: balance, isLoading, refetch } = useBalance({
    address: address,
    token: LOYALTY_CONTRACT_ADDRESS,
  });

  const { writeContract, isPending, data: hash } = useWriteContract();

  async function handleRedeem() {
    writeContract({
      address: LOYALTY_CONTRACT_ADDRESS,
      abi: loyaltyPointsABI,
      functionName: 'redeemForNft',
      args: [parseEther('1000')], // Cost of the NFT is 1000 points
    }, {
      onSuccess: async (data) => {
        alert("Redemption successful! Transaction: " + data);
        refetch();
      },
      onError: (error) => {
        alert("Redemption failed: " + error.message);
      }
    });
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="text-center space-y-8 max-w-4xl px-6">
          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
              ChainLoyalty
            </h1>
            <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transform customer loyalty with blockchain technology. Earn, stake, and redeem <span className="font-bold text-purple-600">LOYAL</span> tokens across partner businesses.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Earn Rewards</h3>
              <p className="text-muted-foreground">Shop at partner stores and earn LOYAL tokens automatically</p>
            </div>

            <div className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Stake & Grow</h3>
              <p className="text-muted-foreground">Stake your tokens to earn additional rewards and bonuses</p>
            </div>

            <div className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛍️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Redeem Anywhere</h3>
              <p className="text-muted-foreground">Use your tokens at any partner business in the network</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16">
            <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4">Get Started</h2>
              <p className="text-muted-foreground mb-6">Connect your wallet to join the loyalty revolution</p>
              <div className="animate-pulse-glow">
                <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl">
                  Connect Wallet to Begin
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="space-y-12">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Your Loyalty Hub
          </h1>
          <p className="text-xl text-muted-foreground">Welcome back! Here&apos;s your rewards dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Balance Card */}
          <div className="glass-effect rounded-3xl p-8 hover:scale-105 transition-all duration-300 animate-glow">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-xl">💰</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-muted-foreground">Total Balance</h3>
                  <p className="text-sm text-muted-foreground">All your rewards in one place</p>
                </div>
              </div>
              
              {isLoading ? (
                <div className="space-y-3">
                  <div className="h-12 bg-muted/20 rounded-lg animate-pulse"></div>
                  <div className="h-4 bg-muted/20 rounded animate-pulse w-1/2"></div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {balance ? parseFloat(formatEther(balance.value)).toFixed(2) : '0.00'}
                  </p>
                  <p className="text-lg font-semibold text-purple-600">
                    {balance?.symbol} Tokens
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Rewards Card */}
          <div className="glass-effect rounded-3xl p-8 hover:scale-105 transition-all duration-300">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-xl">🎁</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Premium Rewards</h3>
                  <p className="text-sm text-muted-foreground">Exclusive membership benefits</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">Loyalty Club NFT</p>
                      <p className="text-sm text-muted-foreground">Premium membership access</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600">1000 LOYAL</p>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleRedeem} 
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all duration-300"
                  size="lg"
                >
                  {isPending ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Redeem Premium NFT"
                  )}
                </Button>

                {hash && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <p className="text-sm font-semibold text-green-600">🎉 Success!</p>
                    <p className="text-xs text-green-600/80 break-all">Tx: {hash}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="/partners" className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Join as Partner</h3>
              <p className="text-muted-foreground">Register your business and start rewarding customers</p>
            </a>

            <a href="/staking" className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Stake Tokens</h3>
              <p className="text-muted-foreground">Earn additional rewards by staking your LOYAL tokens</p>
            </a>

            <a href="/admin" className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Admin Panel</h3>
              <p className="text-muted-foreground">Manage system settings and configurations</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}