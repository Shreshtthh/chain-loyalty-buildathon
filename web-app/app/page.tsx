// web-app/app/page.tsx
'use client';
import { useAccount, useBalance } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { formatEther } from 'viem';

// IMPORTANT: Replace this with your actual deployed contract address
const LOYALTY_CONTRACT_ADDRESS = '0x075944f63b060a2a18f38382220a8d8e150c1810';

export default function HomePage() {
  const { address, isConnected } = useAccount();

  const { data: balance, isLoading } = useBalance({
    address: address,
    token: LOYALTY_CONTRACT_ADDRESS,
  });

  if (!isConnected) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to ChainLoyalty</h1>
        <p className="text-xl text-gray-600 mt-2">Connect your wallet to see your rewards!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Your Loyalty Hub</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Rewards Balance</CardTitle>
            <CardDescription>All your points, in one place.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <p className="text-5xl font-bold">
                {balance ? parseFloat(formatEther(balance.value)).toFixed(2) : '0.00'} 
                <span className="text-3xl text-blue-600 ml-2">{balance?.symbol}</span>
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Available Rewards</CardTitle>
            <CardDescription>Use your points to claim cool stuff!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>1000 LOYAL - 10% Discount NFT</p>
            <p>5000 LOYAL - Special Edition T-Shirt NFT</p>
            <p className="text-sm text-gray-500 pt-2">(Redemption coming soon!)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}