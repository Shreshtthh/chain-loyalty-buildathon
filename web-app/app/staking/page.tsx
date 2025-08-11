'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWriteContract, useAccount, useReadContract, useBalance } from "wagmi";
import { useState, useEffect } from "react";
import { parseEther, formatEther } from "viem";
import { stakingVaultABI } from "@/lib/stakingVaultABI";
import { loyaltyPointsABI } from "@/lib/loyaltyPointsABI";
import contractAddresses from "../../config/contract-addresses.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const STAKING_VAULT_ADDRESS = contractAddresses.stakingVault as `0x${string}`;
const LOYALTY_POINTS_ADDRESS = contractAddresses.loyaltyPoints as `0x${string}`;

const TIERS = [
    { name: "Bronze", requirement: 0, multiplier: "1.00x", color: "text-orange-400" },
    { name: "Silver", requirement: 5000, multiplier: "1.10x", color: "text-slate-400" },
    { name: "Gold", requirement: 25000, multiplier: "1.25x", color: "text-yellow-400" },
];

export default function StakingPage() {
    const { address, isConnected, isConnecting } = useAccount();
    const [stakeAmount, setStakeAmount] = useState('');
    const [unstakeAmount, setUnstakeAmount] = useState('');
    
    const { writeContract: executeWrite, isPending: isWritePending, data: hash, error } = useWriteContract();

    const { data: allowance, refetch: refetchAllowance, isLoading: isAllowanceLoading } = useReadContract({
        address: LOYALTY_POINTS_ADDRESS,
        abi: loyaltyPointsABI,
        functionName: 'allowance',
        args: address ? [address, STAKING_VAULT_ADDRESS] : undefined,
        query: { enabled: !!address }
    });

    const { data: stakedBalance, refetch: refetchStakedBalance, isLoading: isStakedBalanceLoading } = useReadContract({
        address: STAKING_VAULT_ADDRESS,
        abi: stakingVaultABI,
        functionName: 'stakedBalance',
        args: address ? [address] : undefined,
        query: { enabled: !!address }
    });

    const { data: tierLevel, refetch: refetchTierLevel, isLoading: isTierLoading } = useReadContract({
        address: STAKING_VAULT_ADDRESS,
        abi: stakingVaultABI,
        functionName: 'tierLevel',
        args: address ? [address] : undefined,
        query: { enabled: !!address }
    });

    const { data: loyalBalance, refetch: refetchLoyalBalance, isLoading: isLoyalBalanceLoading } = useBalance({
        address,
        token: LOYALTY_POINTS_ADDRESS,
    });

    const loyalBalanceFormatted = loyalBalance ? parseFloat(formatEther(loyalBalance.value)) : 0;
    const needsApproval = allowance !== undefined && parseEther(stakeAmount || '0') > (allowance as bigint);
    const hasInsufficientBalance = parseFloat(stakeAmount || '0') > loyalBalanceFormatted;

    function handleApprove() {
        executeWrite({
            address: LOYALTY_POINTS_ADDRESS,
            abi: loyaltyPointsABI,
            functionName: 'approve',
            args: [STAKING_VAULT_ADDRESS, parseEther(stakeAmount)],
        }, { onSuccess: () => setTimeout(() => refetchAllowance(), 1000) });
    }

    function handleStake() {
        executeWrite({
            address: STAKING_VAULT_ADDRESS,
            abi: stakingVaultABI,
            functionName: 'stake',
            args: [parseEther(stakeAmount)],
        }, { onSuccess: () => { setTimeout(() => refetchAllData(), 1000); setStakeAmount(''); } });
    }

    function handleUnstake() {
        executeWrite({
            address: STAKING_VAULT_ADDRESS,
            abi: stakingVaultABI,
            functionName: 'unstake',
            args: [parseEther(unstakeAmount)],
        }, { onSuccess: () => { setTimeout(() => refetchAllData(), 1000); setUnstakeAmount(''); } });
    }
    
    function refetchAllData() {
        refetchAllowance();
        refetchStakedBalance();
        refetchLoyalBalance();
        refetchTierLevel();
    }

    useEffect(() => {
        if (isConnected && address) {
            refetchAllData();
        }
    }, [isConnected, address]);

    // --- ✨ NEW: Loading State Handling ✨ ---
    if (isConnecting || isAllowanceLoading || isStakedBalanceLoading || isTierLoading || isLoyalBalanceLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
            </div>
        );
    }

    if (!isConnected) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                 <div className="text-center space-y-6 max-w-md">
                    <h1 className="text-3xl font-bold">Connect Required</h1>
                    <p className="text-muted-foreground">Please connect your wallet to access the staking vault.</p>
                </div>
            </div>
        );
    }

    const stakedBalanceFormatted = stakedBalance ? parseFloat(formatEther(stakedBalance as bigint || BigInt(0))) : 0;
    const totalValue = loyalBalanceFormatted + stakedBalanceFormatted;
    const currentTierIndex = tierLevel !== undefined ? Number(tierLevel) : 0;
    const currentTier = TIERS[currentTierIndex];
    const nextTier = TIERS[currentTierIndex + 1];

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-6">
                    <h1 className="text-6xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">Staking Vault</h1>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="glass-effect rounded-2xl p-6 text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground mb-2">Available Balance</h3>
                        <p className="text-3xl font-bold text-blue-600">{loyalBalanceFormatted.toFixed(2)} LOYAL</p>
                    </div>
                    <div className="glass-effect rounded-2xl p-6 text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground mb-2">Staked Amount</h3>
                        <p className="text-3xl font-bold text-green-600">{stakedBalanceFormatted.toFixed(2)} LOYAL</p>
                    </div>
                    <div className="glass-effect rounded-2xl p-6 text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground mb-2">Total Portfolio</h3>
                        <p className="text-3xl font-bold text-purple-600">{totalValue.toFixed(2)} LOYAL</p>
                    </div>
                </div>
                <div className="glass-effect rounded-3xl p-8 space-y-4 text-center">
                    <h2 className="text-3xl font-bold">Your Staking Tier</h2>
                    <p className={`text-5xl font-extrabold ${currentTier.color}`}>{currentTier.name}</p>
                    <p className="text-xl text-muted-foreground">You are earning a <span className="font-bold text-green-500">{currentTier.multiplier}</span> reward multiplier.</p>
                    {nextTier && stakedBalanceFormatted < nextTier.requirement && (
                        <div className="pt-2">
                            <p className="text-lg text-muted-foreground">Stake <span className="font-bold text-purple-500">{(nextTier.requirement - stakedBalanceFormatted).toFixed(2)}</span> more LOYAL to reach the <span className={`font-bold ${nextTier.color}`}>{nextTier.name}</span> tier!</p>
                        </div>
                    )}
                </div>
                <div className="max-w-2xl mx-auto">
                    <Tabs defaultValue="stake" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="stake">Stake</TabsTrigger>
                            <TabsTrigger value="unstake">Unstake</TabsTrigger>
                        </TabsList>
                        <TabsContent value="stake">
                            <div className="glass-effect rounded-b-3xl p-8 space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="stake-amount" className="text-lg font-semibold">Amount to Stake</Label>
                                    <Input id="stake-amount" type="number" value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} placeholder="0.00" />
                                    {hasInsufficientBalance && <p className="text-sm text-red-500 pt-1">Insufficient balance.</p>}
                                </div>
                                {needsApproval ? (
                                    <Button onClick={handleApprove} disabled={isWritePending || !stakeAmount || hasInsufficientBalance || parseFloat(stakeAmount) <= 0} className="w-full">
                                        {isWritePending ? 'Approving...' : 'Approve'}
                                    </Button>
                                ) : (
                                    <Button onClick={handleStake} disabled={isWritePending || !stakeAmount || hasInsufficientBalance || parseFloat(stakeAmount) <= 0} className="w-full">
                                        {isWritePending ? 'Staking...' : 'Stake'}
                                    </Button>
                                )}
                            </div>
                        </TabsContent>
                        <TabsContent value="unstake">
                            <div className="glass-effect rounded-b-3xl p-8 space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="unstake-amount" className="text-lg font-semibold">Amount to Unstake</Label>
                                    <Input id="unstake-amount" type="number" value={unstakeAmount} onChange={(e) => setUnstakeAmount(e.target.value)} placeholder="0.00" />
                                </div>
                                <Button onClick={handleUnstake} disabled={isWritePending || !unstakeAmount || parseFloat(unstakeAmount) <= 0 || parseFloat(unstakeAmount) > stakedBalanceFormatted} className="w-full">
                                    {isWritePending ? 'Unstaking...' : 'Unstake'}
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                    {hash && <p className="mt-4 text-center text-sm text-green-500">Transaction successful! Tx: {hash.slice(0,10)}...</p>}
                    {error && <p className="mt-4 text-center text-sm text-red-500">Error: {error.message.includes("User rejected the request") ? "Transaction rejected by user." : "An error occurred."}</p>}
                </div>
            </div>
        </div>
    );
}
