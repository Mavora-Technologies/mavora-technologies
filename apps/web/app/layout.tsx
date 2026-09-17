import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

const SITE_URL = 'https://mavoratechnologies.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Mavora Technologies | Software, AI, Cybersecurity & IT Solutions in Kenya',
    template: '%s | Mavora Technologies',
  },
  description:
    'Mavora Technologies is a Kenyan technology company providing custom software development, AI automation, web development, mobile apps, cybersecurity, cloud IT, data analytics and digital transformation solutions.',
  authors: [{ name: 'Mavora Technologies Ltd' }],
  creator: 'Mavora Technologies Ltd',
  publisher: 'Mavora Technologies Ltd',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: SITE_URL,
    title: 'Mavora Technologies | Software, AI, Cybersecurity & IT Solutions in Kenya',
    description:
      'Mavora Technologies provides enterprise software development, AI automation, cloud computing, data analytics, and cybersecurity solutions for businesses in Kenya.',
    siteName: 'Mavora Technologies',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Mavora Technologies - Technology Solutions in Kenya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mavora Technologies | Software, AI, Cybersecurity & IT Solutions in Kenya',
    description:
      'Leading technology company in Kenya specializing in custom software, AI, cybersecurity, and cloud IT.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Mavora Technologies Ltd',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
          caption: 'Mavora Technologies Logo',
        },
        description:
          'Providing enterprise custom software development, AI automation, cybersecurity, cloud computing, and IT consulting across Kenya.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Wood Garden Road, off Wood Avenue, Kilimani',
          addressLocality: 'Nairobi',
          addressRegion: 'Nairobi County',
          addressCountry: 'KE',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+254-799-985842',
          contactType: 'customer service',
          email: 'info@mavoratechnologies.com',
          areaServed: ['Nairobi', 'Mombasa', 'Kisumu', 'Eldoret', 'Kisii', 'Busia', 'Machakos', 'Muranga'],
          availableLanguage: ['English', 'Swahili'],
        },
        sameAs: [
          'https://www.facebook.com/profile.php?id=61594348532790',
          'https://www.linkedin.com/in/mavora-technologies-a4938a437/',
          'https://www.instagram.com/mav0ratechnologiesltd/',
          'https://www.tiktok.com/@mavoratechnologies',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Mavora Technologies',
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
        inLanguage: 'en-KE',
      },
    ],
  };

  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen pt-20 ${inter.className}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}