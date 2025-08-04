'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useWriteContract, useAccount } from "wagmi";
import { partnerRegistryABI } from "@/lib/partnerRegistryABI";


const PARTNER_REGISTRY_ADDRESS = '0xa66fed2dfdef58bcb3ec90c94b642dae983f6851';

export default function PartnerPage() {
    const { isConnected } = useAccount();
    const { writeContract, isPending, data: hash } = useWriteContract();

    function handleRegister() {
        writeContract({
            address: PARTNER_REGISTRY_ADDRESS,
            abi: partnerRegistryABI,
            functionName: 'register',
        });
    }

    if (!isConnected) {
        return <p>Please connect a wallet to become a partner.</p>
    }

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Partner Portal</CardTitle>
                <CardDescription>Join the Chain-Loyalty network to start rewarding your users.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-4">By registering, your contract will be granted the Minter Role, allowing you to distribute LOYAL tokens.</p>
                <Button onClick={handleRegister} disabled={isPending}>
                    {isPending ? "Confirm in wallet..." : "Register as a Partner"}
                </Button>
                {hash && <div className="text-sm text-green-600 break-words mt-4">Success! Tx: {hash}</div>}
            </CardContent>
        </Card>
    );
}