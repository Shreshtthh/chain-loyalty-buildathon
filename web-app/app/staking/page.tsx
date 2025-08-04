'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWriteContract, useAccount, useReadContract, useBalance } from "wagmi";
import { useState } from "react";
import { parseEther, formatEther } from "viem";
import { stakingVaultABI } from "@/lib/stakingVaultABI";
import { loyaltyPointsABI } from "@/lib/loyaltyPointsABI";


const STAKING_VAULT_ADDRESS = '0xe7e68ba22a0ca958a8ed28d365dbf128e5b569a9';
const LOYALTY_POINTS_ADDRESS = '0x11e3febc05cca9b1ce88787b91bbbd18ddfafd0a';

export default function StakingPage() {
    const { address, isConnected } = useAccount();
    const [amount, setAmount] = useState('');
    const { writeContract, isPending } = useWriteContract();

    // Read user's staked balance
    const { data: stakedBalance, refetch: refetchStakedBalance } = useReadContract({
        address: STAKING_VAULT_ADDRESS,
        abi: stakingVaultABI,
        functionName: 'stakedBalance',
        args: address ? [address] : undefined,
        query: {
        enabled: !!address,
        }
    });

    // Read user's LOYAL token balance
    const { data: loyalBalance, refetch: refetchLoyalBalance } = useBalance({
        address,
        token: LOYALTY_POINTS_ADDRESS,

    });

    function handleStake() {
        writeContract({
            address: STAKING_VAULT_ADDRESS,
            abi: stakingVaultABI,
            functionName: 'stake',
            args: [parseEther(amount)],
        }, {
            onSuccess: () => {
                refetchStakedBalance();
                refetchLoyalBalance();
            }
        });
    }

    if (!isConnected) {
        return <p>Please connect your wallet to view the staking vault.</p>
    }

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Staking Vault</CardTitle>
                <CardDescription>Stake your LOYAL tokens to earn reward multipliers.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <p>Your Balance: {loyalBalance ? parseFloat(formatEther(loyalBalance.value)).toFixed(2) : '0.00'} LOYAL</p>
                    <p>Staked Amount: {stakedBalance ? parseFloat(formatEther(stakedBalance as bigint)).toFixed(2) : '0.00'} LOYAL</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="amount">Amount to Stake</Label>
                    <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <Button onClick={handleStake} disabled={isPending} className="w-full mt-4">
                    {isPending ? "Staking..." : "Stake Tokens"}
                </Button>
            </CardContent>
        </Card>
    );
}