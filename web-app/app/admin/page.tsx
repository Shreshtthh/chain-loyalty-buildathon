// web-app/app/admin/page.tsx
'use client';

import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { loyaltyPointsABI } from '../../lib/loyaltyPointsABI';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { parseEther } from 'viem';

// IMPORTANT: Replace this with your actual deployed contract address
const LOYALTY_CONTRACT_ADDRESS = '0xb3ef80eddc7b9ab9318678dc75323df5cc16a579';

export default function AdminPage() {
  const { address, isConnected } = useAccount();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  
  const { writeContract, isPending, data: hash } = useWriteContract();

  function handleMint() {
    if (!toAddress || !amount) {
      alert("Please enter both an address and an amount.");
      return;
    }
    writeContract({
      address: LOYALTY_CONTRACT_ADDRESS,
      abi: loyaltyPointsABI,
      functionName: 'mint',
      args: [toAddress as `0x${string}`, parseEther(amount)], // parseEther handles decimals
    });
  }

  if (!isConnected) {
    return <p>Please connect your wallet to use the admin panel.</p>;
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Admin Minting Panel</CardTitle>
          <CardDescription>Mint LOYAL tokens to any address.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="toAddress">Recipient Address</Label>
            <Input 
              id="toAddress" 
              placeholder="0x..." 
              value={toAddress} 
              onChange={(e) => setToAddress(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount to Mint</Label>
            <Input 
              id="amount" 
              type="number" 
              placeholder="e.g., 100" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
            />
          </div>
          <Button onClick={handleMint} disabled={isPending} className="w-full">
            {isPending ? "Minting..." : "Mint Tokens"}
          </Button>
          {hash && <div className="text-center text-sm text-green-600">Success! Tx: {hash.substring(0,10)}...</div>}
        </CardContent>
      </Card>
    </div>
  );
} 