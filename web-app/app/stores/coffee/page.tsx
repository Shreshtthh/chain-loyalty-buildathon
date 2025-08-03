// web-app/app/stores/coffee/page.tsx
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

export default function CoffeeStorePage() {
  function handleBuy() {
    alert("Thank you for your purchase! Your loyalty points are on their way.");
    
  }

  return (
    <div className="max-w-sm mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Morph Coffee</CardTitle>
          <CardDescription>The best brew on the blockchain.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
        <div className="w-full h-48 relative"> 
        <Image
           src="/coffee.jpeg"
           alt="A cup of coffee"
           layout="fill"
           objectFit="cover"
           className="rounded-md"
                       />
          </div>
          <Button onClick={handleBuy} className="w-full">Buy for 0.001 ETH</Button>
        </CardContent>
      </Card>
    </div>
  );
}