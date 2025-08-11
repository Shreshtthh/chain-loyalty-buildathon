// web-app/components/Header.tsx
'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path ? 'text-purple-600 font-semibold' : 'text-muted-foreground hover:text-purple-600';
  };

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ChainLoyalty
            </span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/staking" className={`${isActive('/staking')} transition-all duration-300 hover:scale-105`}>
              <div className="flex items-center space-x-2">
                <span className="text-lg">📈</span>
                <span className="font-medium">Staking</span>
              </div>
            </Link>
            
            <Link href="/partners" className={`${isActive('/partners')} transition-all duration-300 hover:scale-105`}>
              <div className="flex items-center space-x-2">
                <span className="text-lg">🤝</span>
                <span className="font-medium">Partners</span>
              </div>
            </Link>
            
            <Link href="/stores/coffee" className={`${isActive('/stores/coffee')} transition-all duration-300 hover:scale-105`}>
              <div className="flex items-center space-x-2">
                <span className="text-lg">☕</span>
                <span className="font-medium">Coffee</span>
              </div>
            </Link>
            
            <Link href="/stores/merch" className={`${isActive('/stores/merch')} transition-all duration-300 hover:scale-105`}>
              <div className="flex items-center space-x-2">
                <span className="text-lg">👕</span>
                <span className="font-medium">Merch</span>
              </div>
            </Link>

            <Link href="/admin" className={`${isActive('/admin')} transition-all duration-300 hover:scale-105`}>
              <div className="flex items-center space-x-2">
                <span className="text-lg">⚙️</span>
                <span className="font-medium">Admin</span>
              </div>
            </Link>
          </nav>

          {/* Connect Button with Custom Styling */}
          <div className="animate-pulse-glow">
            <ConnectButton />
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex flex-wrap gap-4 justify-center">
          <Link href="/staking" className={`${isActive('/staking')} text-sm flex items-center space-x-1`}>
            <span>📈</span>
            <span>Staking</span>
          </Link>
          
          <Link href="/partners" className={`${isActive('/partners')} text-sm flex items-center space-x-1`}>
            <span>🤝</span>
            <span>Partners</span>
          </Link>
          
          <Link href="/stores/coffee" className={`${isActive('/stores/coffee')} text-sm flex items-center space-x-1`}>
            <span>☕</span>
            <span>Coffee</span>
          </Link>
          
          <Link href="/stores/merch" className={`${isActive('/stores/merch')} text-sm flex items-center space-x-1`}>
            <span>👕</span>
            <span>Merch</span>
          </Link>

          <Link href="/admin" className={`${isActive('/admin')} text-sm flex items-center space-x-1`}>
            <span>⚙️</span>
            <span>Admin</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}