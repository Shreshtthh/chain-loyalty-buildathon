// web-app/app/stores/merch/page.tsx
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

export default function MerchStorePage() {
  function handleBuy() {
    alert("Thank you for your purchase! Your loyalty points are on their way.");
  }

  return (
    <div className="max-w-sm mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Web3 Wearables</CardTitle>
          <CardDescription>On-chain apparel for the discerning degen.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="w-full h-48 relative">
            <Image
              src="/tshirt.png" 
              alt="A stylish Web3 t-shirt"
              layout="fill"
              objectFit="contain" // Changed to "contain" to prevent cropping
              className="rounded-md"
            />
          </div>
          
          <Button onClick={handleBuy} className="w-full">Buy for 0.01 ETH</Button>
        </CardContent>
      </Card>
    </div>
  );
}