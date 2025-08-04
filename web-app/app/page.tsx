// web-app/app/page.tsx
'use client';
import { useAccount, useBalance, useWriteContract } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { formatEther, parseEther } from 'viem';
import { loyaltyPointsABI } from '@/lib/loyaltyPointsABI';


const LOYALTY_CONTRACT_ADDRESS = '0x11e3febc05cca9b1ce88787b91bbbd18ddfafd0a';

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
        // Refetch the balance after a successful transaction
        refetch();
      },
      onError: (error) => {
        alert("Redemption failed: " + error.message);
      }
    });
  }

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
          <CardContent className="space-y-4">
            <div>
              <p className='font-semibold'>Loyalty Club Membership NFT</p>
              <p className='text-sm text-gray-600'>Redeem for 1000 LOYAL</p>
            </div>
            <Button onClick={handleRedeem} disabled={isPending}>
              {isPending ? "Confirm in wallet..." : "Redeem Now"}
            </Button>
            {hash && <div className="text-sm text-green-600 break-words">Success! Tx: {hash}</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}