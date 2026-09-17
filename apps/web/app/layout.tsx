import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = 'https://mavoratechnologies.com';
const ogImage = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      'Mavora Technologies | Software, AI, Cybersecurity & IT Solutions in Kenya',
    template: '%s | Mavora Technologies',
  },

  description:
    'Mavora Technologies is a Kenyan technology company providing custom software development, AI automation, web development, mobile apps, cybersecurity, cloud IT, data analytics and digital transformation solutions.',

  applicationName: 'Mavora Technologies',

  authors: [
    {
      name: 'Mavora Technologies',
      url: siteUrl,
    },
  ],

  creator: 'Mavora Technologies',

  publisher: 'Mavora Technologies',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: siteUrl,

    title:
      'Mavora Technologies | Software, AI, Cybersecurity & IT Solutions in Kenya',

    description:
      'Custom software, AI automation, web development, mobile apps, cybersecurity, cloud IT, data analytics and digital transformation solutions for businesses in Kenya.',

    siteName: 'Mavora Technologies',

    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt:
          'Mavora Technologies - Software, AI, Cybersecurity and IT Solutions in Kenya',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title:
      'Mavora Technologies | Software, AI, Cybersecurity & IT Solutions in Kenya',

    description:
      'Custom software, AI automation, cybersecurity, cloud IT, web and mobile development solutions in Kenya.',

    images: [ogImage],
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Mavora Technologies Ltd',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
        },
        description:
          'Mavora Technologies provides software development, AI automation, web development, mobile applications, cybersecurity, cloud IT, data analytics and digital transformation solutions in Kenya.',
        telephone: '+254-799-985842',
        email: 'info@mavoratechnologies.com',

        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Wood Garden Road, off Wood Avenue, Kilimani',
          addressLocality: 'Nairobi',
          addressRegion: 'Nairobi County',
          addressCountry: 'KE',
        },

        areaServed: [
          'Kenya',
          'Nairobi',
          'Mombasa',
          'Kisumu',
          'Eldoret',
          'Kisii',
          'Busia',
          'Machakos',
          'Muranga',
        ],

        sameAs: [
          'https://www.facebook.com/profile.php?id=61594348532790',
          'https://www.linkedin.com/in/mavora-technologies-a4938a437/',
          'https://www.instagram.com/mav0ratechnologiesltd/',
          'https://www.tiktok.com/@mavoratechnologies',
        ],
      },

      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Mavora Technologies',
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        inLanguage: 'en-KE',
      },
    ],
  };

  return (
    <html lang="en-KE">
      <body className={`flex flex-col min-h-screen pt-20 ${inter.className}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}