// web-app/app/stores/merch/page.tsx
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function MerchStorePage() {
  function handleBuy() {
    alert("Thank you for your purchase! Your loyalty points are on their way.");
  }

  return (
    <div className="max-w-sm mx-auto">
      <Card>
        <CardHeader>
          {/* CHANGE THIS */}
          <CardTitle>Web3 Wearables</CardTitle>
          {/* AND THIS */}
          <CardDescription>On-chain apparel for the discerning degen.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center font-semibold text-gray-500">
             {/* AND THIS */}
             Image of an NFT T-Shirt
          </div>
          {/* AND THIS */}
          <Button onClick={handleBuy} className="w-full">Buy for 0.01 ETH</Button>
        </CardContent>
      </Card>
    </div>
  );
}