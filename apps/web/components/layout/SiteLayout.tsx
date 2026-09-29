'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // If we are on an admin route, return ONLY the children (no Header, no Footer, no padding)
  if (isAdmin) {
    return <main className="flex-grow">{children}</main>;
  }

  // If we are on the public site, include the Navbar, Footer, and the top padding
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
    </>
  );
}