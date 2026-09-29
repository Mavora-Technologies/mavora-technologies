// apps/web/components/SiteLayoutWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
// Use the correct paths and named imports from your project structure
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function SiteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    // Admin pages get full screen with no Navbar, no Footer, and no padding
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <>
      <Navbar />
      {/* pt-20 ensures the public pages don't hide behind your fixed Navbar */}
      <main className="flex-grow min-h-screen pt-20">{children}</main>
      <Footer />
    </>
  );
}