// web-app/app/stores/coffee/page.tsx
'use client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function CoffeeStorePage() {
  const [purchased, setPurchased] = useState(false);

  function handleBuy() {
    setPurchased(true);
    setTimeout(() => setPurchased(false), 5000);
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center animate-glow">
              <span className="text-6xl">☕</span>
            </div>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            Morph Coffee
          </h1>
          <p className="text-2xl text-muted-foreground">
            The finest blockchain-brewed coffee experience
          </p>
        </div>

        {/* Product Showcase */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 space-y-8">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden group">
              <Image
                src="/coffee.jpeg"
                alt="Premium coffee cup"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-bold mb-2">Premium Blend</h3>
                <p className="text-lg opacity-90">Artisanal coffee from the blockchain highlands</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
                  Signature Coffee
                </h2>
                <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                  Experience our premium blend crafted with beans from sustainable farms, 
                  now available with LOYAL token rewards!
                </p>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌱</span>
                    <div>
                      <p className="font-semibold">Organic & Sustainable</p>
                      <p className="text-sm text-muted-foreground">Ethically sourced beans</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <p className="font-semibold">Instant Rewards</p>
                      <p className="text-sm text-muted-foreground">Earn LOYAL tokens</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🚚</span>
                    <div>
                      <p className="font-semibold">Fast Delivery</p>
                      <p className="text-sm text-muted-foreground">Fresh to your door</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🔐</span>
                    <div>
                      <p className="font-semibold">Blockchain Verified</p>
                      <p className="text-sm text-muted-foreground">Authentic quality</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Section */}
              <div className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-amber-600">0.001 ETH</p>
                    <p className="text-sm text-muted-foreground">+ Earn 100 LOYAL tokens</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">Premium Coffee</p>
                    <p className="text-sm text-muted-foreground">Single serving</p>
                  </div>
                </div>

                <Button 
                  onClick={handleBuy}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-6 text-xl rounded-2xl transition-all duration-300 animate-pulse-glow"
                  size="lg"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-2xl">☕</span>
                    <span>Buy Now - 0.001 ETH</span>
                  </div>
                </Button>
              </div>

              {/* Success Message */}
              {purchased && (
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl space-y-2 animate-pulse-glow">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl">🎉</span>
                    <h3 className="text-2xl font-bold text-green-600">Purchase Successful!</h3>
                  </div>
                  <p className="text-green-600 text-center">Your coffee is brewing and 100 LOYAL tokens are on their way!</p>
                  <div className="text-center space-y-2">
                    <p className="text-sm text-green-600/80">Expected delivery: 15-20 minutes</p>
                    <p className="text-sm text-green-600/80">LOYAL tokens will be credited after delivery confirmation</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold">Why Choose Morph Coffee?</h3>
          <p className="text-lg text-muted-foreground">
            We&apos;re pioneering the future of retail with blockchain-integrated loyalty rewards. 
            Every purchase not only gets you premium coffee but also builds your digital asset portfolio 
            through LOYAL tokens that can be used across our entire partner network.
          </p>
        </div>
      </div>
    </div>
  );
}