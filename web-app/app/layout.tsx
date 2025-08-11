// web-app/app/layout.tsx
import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChainLoyalty | Revolutionary Web3 Loyalty Platform',
  description: 'Transform customer loyalty with blockchain technology. Earn, stake, and redeem LOYAL tokens across partner businesses.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="relative min-h-screen overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 -z-10">
              <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full animate-float"></div>
              <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
              
              {/* Floating Particles */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-orbit"></div>
              <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-orbit" style={{animationDelay: '10s'}}></div>
              <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-pink-400 rounded-full animate-orbit" style={{animationDelay: '15s'}}></div>
            </div>

            <Header />
            <main className="relative z-10 container mx-auto px-4 py-8">
              {children}
            </main>

            {/* Footer Glow */}
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-24 bg-gradient-to-t from-purple-500/20 to-transparent blur-xl -z-10"></div>
          </div>
        </Providers>
      </body>
    </html>
  );
}