'use client';
import { Button } from "@/components/ui/button";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { partnerRegistryABI } from "@/lib/partnerRegistryABI";
import { parseEther } from "viem";
import contractAddresses from "../../config/contract-addresses.json";

const PARTNER_REGISTRY_ADDRESS = contractAddresses.partnerRegistry as `0x${string}`;

export default function PartnerPage() {
    const { isConnected, address } = useAccount();
    const { writeContract, isPending, data: hash, error } = useWriteContract();

    // Read the actual registration fee from the contract
    const { data: registrationFee } = useReadContract({
        address: PARTNER_REGISTRY_ADDRESS,
        abi: partnerRegistryABI,
        functionName: 'registrationFee',
    });

    // Check if user is already a partner
    const { data: isAlreadyPartner } = useReadContract({
        address: PARTNER_REGISTRY_ADDRESS,
        abi: partnerRegistryABI,
        functionName: 'isPartner',
        args: address ? [address] : undefined, 
        query: {
            enabled: !!address, 
        },
    });

    // Add this debug information to see what's happening
    console.log('Registration fee from contract:', registrationFee);
    console.log('Is already partner:', isAlreadyPartner);
    console.log('Connected address:', address);
    console.log('Contract address:', PARTNER_REGISTRY_ADDRESS);

    function handleRegister() {
        console.log('=== Registration Debug Info ===');
        console.log('Registration fee:', registrationFee);
        console.log('Registration fee type:', typeof registrationFee);
        console.log('Is already partner:', isAlreadyPartner);
        console.log('Address:', address);
        
        if (!registrationFee) {
            console.error('Registration fee not loaded');
            return;
        }

        if (isAlreadyPartner) {
            console.error('Already registered as partner');
            return;
        }

        writeContract({
            address: PARTNER_REGISTRY_ADDRESS,
            abi: partnerRegistryABI,
            functionName: 'register',
            value: registrationFee,
        });
    }

    // Add error logging
    if (error) {
        console.error('Transaction error:', error);
    }

    if (!isConnected) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-6 max-w-md">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                        <span className="text-4xl">🔐</span>
                    </div>
                    <h1 className="text-3xl font-bold">Connect Required</h1>
                    <p className="text-muted-foreground">Please connect your wallet to access the partner portal.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-glow">
                            <span className="text-6xl">🤝</span>
                        </div>
                    </div>
                    <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Partner Portal
                    </h1>
                    <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
                        Join the ChainLoyalty network and start rewarding your customers with blockchain-powered loyalty points
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">💰</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Earn Revenue</h3>
                        <p className="text-muted-foreground">Generate additional income through the loyalty ecosystem</p>
                    </div>

                    <div className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">👥</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Attract Customers</h3>
                        <p className="text-muted-foreground">Draw new customers with innovative reward programs</p>
                    </div>

                    <div className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🚀</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Scale Globally</h3>
                        <p className="text-muted-foreground">Reach customers worldwide through blockchain technology</p>
                    </div>
                </div>

                {/* Registration Card */}
                <div className="max-w-2xl mx-auto">
                    <div className="glass-effect rounded-3xl p-8 text-center space-y-8 animate-glow">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Become a Partner
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Register your business and gain access to mint LOYAL tokens for your customers
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-4 text-left">
                            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                                <span className="font-semibold">Minter Role - Distribute LOYAL tokens to customers</span>
                            </div>

                            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                                <span className="font-semibold">Weekly Allowance - 10,000 LOYAL tokens per week</span>
                            </div>

                            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                                <span className="font-semibold">Network Access - Join the global loyalty ecosystem</span>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">One-time Registration Fee</p>
                                    <p className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        {registrationFee ? `${parseFloat(registrationFee.toString()) / 1e18} ETH` : 'Loading...'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Weekly Token Allowance</p>
                                    <p className="text-2xl font-bold text-green-600">10,000 LOYAL</p>
                                </div>
                            </div>
                        </div>

                        {/* Registration Button */}
                        <div className="pt-4">
                            <Button 
                                onClick={handleRegister} 
                                disabled={isPending || !registrationFee || isAlreadyPartner}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 text-xl rounded-2xl transition-all duration-300 animate-pulse-glow"
                                size="lg"
                            >
                                {isPending ? (
                                    <div className="flex items-center space-x-3">
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Processing Registration...</span>
                                    </div>
                                ) : isAlreadyPartner ? (
                                    <span>Already Registered</span>
                                ) : (
                                    <div className="flex items-center justify-center space-x-3">
                                        <span className="text-2xl">🚀</span>
                                        <span>Register as Partner ({registrationFee ? `${parseFloat(registrationFee.toString()) / 1e18} ETH` : 'Loading...'})</span>
                                    </div>
                                )}
                            </Button>
                        </div>

                        {/* Success Message */}
                        {hash && (
                            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl space-y-2">
                                <div className="flex items-center justify-center space-x-2">
                                    <span className="text-3xl">🎉</span>
                                    <h3 className="text-2xl font-bold text-green-600">Registration Successful!</h3>
                                </div>
                                <p className="text-green-600">Welcome to the ChainLoyalty partner network!</p>
                                <div className="p-3 bg-green-500/5 rounded-lg">
                                    <p className="text-sm font-mono text-green-600/80 break-all">Transaction: {hash}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center space-y-6">
                    <h3 className="text-2xl font-bold">Ready to Transform Your Business?</h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Join hundreds of businesses already using ChainLoyalty to create deeper customer relationships and drive growth through blockchain-powered rewards.
                    </p>
                </div>
            </div>
        </div>
    );
}