import type { Metadata } from 'next';
import { CartDrawer } from '@/components/CartDrawer';
import { LocationModal } from '@/components/LocationModal';
import { SearchOverlay } from '@/components/SearchOverlay';
import { Toast } from '@/components/Toast';
import { StoreProvider } from '@/lib/store';
import './globals.css';

export const metadata: Metadata = {
  title: 'Freshcatch · Fresh seafood, delivered overnight',
  description: 'Hand-selected seafood from sustainable fisheries — prepped, packed, and shipped overnight across the UAE.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StoreProvider>
          {children}
          <CartDrawer />
          <SearchOverlay />
          <Toast />
          <LocationModal />
        </StoreProvider>
      </body>
    </html>
  );
}
