// web-app/app/stores/coffee/page.tsx
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CoffeeStorePage() {
  function handleBuy() {
    alert("Thank you for your purchase! Your loyalty points are on their way.");
    // In the real demo, this is your cue to use the admin panel to mint points.
  }

  return (
    <div className="max-w-sm mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Morph Coffee</CardTitle>
          <CardDescription>The best brew on the blockchain.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center font-semibold text-gray-500">
             Image of Coffee
          </div>
          <Button onClick={handleBuy} className="w-full">Buy for 0.001 ETH</Button>
        </CardContent>
      </Card>
    </div>
  );
}