// web-app/wagmi.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { Chain } from 'wagmi/chains';

const morphSepolia = {
  id: 2810,
  name: 'Morph Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc-quicknode-holesky.morphl2.io'] },
  },
  blockExplorers: {
    default: { name: 'Morph Explorer', url: 'https://explorer-testnet.morphl2.io' },
  },
} as const satisfies Chain;


export const config = getDefaultConfig({
  appName: 'Chain Loyalty',
  projectId: 'YOUR_PROJECT_ID', // Get one from https://cloud.walletconnect.com
  chains: [morphSepolia],
  ssr: true,
});