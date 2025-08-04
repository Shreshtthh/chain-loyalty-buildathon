// web-app/components/Header.tsx
'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-gray-100 border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Chain<span className="text-blue-600">Loyalty</span>
        </Link>
        
        
        <nav className="flex items-center space-x-6 text-lg">
          <Link href="/staking" className="hover:text-blue-600">Staking</Link>
          <Link href="/partners" className="hover:text-blue-600">For Partners</Link>
          <Link href="/stores/coffee" className="hover:text-blue-600">Coffee Shop</Link>
          <Link href="/stores/merch" className="hover:text-blue-600">Merch Store</Link>
        </nav>
       

        <ConnectButton />
      </div>
    </header>
  );
}