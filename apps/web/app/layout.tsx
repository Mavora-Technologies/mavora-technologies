import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

// 1. Global Metadata Configuration
export const metadata: Metadata = {
  title: {
    default: 'Mavora Technologies | Top IT, Software & Cybersecurity Company in Kenya',
    template: '%s | Mavora Technologies Kenya',
  },
  description: 'Leading ICT company in Kenya offering custom software development, AI automation, web design, cybersecurity, and cloud IT solutions across Nairobi, Mombasa, Kisumu, Eldoret, and nationwide.',
  keywords: [
    'IT company in Kenya',
    'Software developers Nairobi',
    'Web design Mombasa',
    'Cybersecurity services Kenya',
    'ICT companies in Kisumu',
    'App developers Eldoret',
    'Business IT support Machakos',
    'AI automation Kenya',
    'Cloud computing Nairobi',
    'Mavora Technologies'
  ],
  authors: [{ name: 'Mavora Technologies' }],
  creator: 'Mavora Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://mavoratechnologies.com',
    title: 'Mavora Technologies | Enterprise IT Solutions in Kenya',
    description: 'Transforming businesses with custom software, AI, and cybersecurity in Nairobi, Mombasa, and across Kenya.',
    siteName: 'Mavora Technologies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mavora Technologies | Top IT & Software Company in Kenya',
    description: 'Leading digital transformation with software, AI, and IT support across Kenya.',
  },
  alternates: {
    canonical: 'https://mavoratechnologies.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Structured Data (Schema.org) for Local SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ITUtility',
    name: 'Mavora Technologies Ltd',
    url: 'https://mavoratechnologies.com',
    logo: 'https://mavoratechnologies.com/logo.png',
    description: 'Providing software development, AI automation, cybersecurity, and IT consulting across Kenya.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Wood Garden Road, off Wood Avenue, Kilimani',
      addressLocality: 'Nairobi',
      addressRegion: 'Nairobi County',
      addressCountry: 'KE'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+254-799-985842',
      contactType: 'customer service',
      email: 'info@mavoratechnologies.com',
      areaServed: ['Nairobi', 'Mombasa', 'Kisumu', 'Eldoret', 'Kisii', 'Busia', 'Machakos', 'Muranga'],
      availableLanguage: ['English', 'Swahili']
    },
    areaServed: [
      { '@type': 'City', name: 'Nairobi' },
      { '@type': 'City', name: 'Mombasa' },
      { '@type': 'City', name: 'Kisumu' },
      { '@type': 'City', name: 'Eldoret' },
      { '@type': 'City', name: 'Kisii' },
      { '@type': 'City', name: 'Busia' },
      { '@type': 'City', name: 'Machakos' },
      { '@type': 'City', name: 'Muranga' }
    ],
    sameAs: [
      'https://www.facebook.com/profile.php?id=61594348532790',
      'https://www.linkedin.com/in/mavora-technologies-a4938a437/',
      'https://www.instagram.com/mav0ratechnologiesltd/',
      'https://www.tiktok.com/@mavoratechnologies'
    ]
  };

  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen pt-20 ${inter.className}`}>
        {/* Inject JSON-LD for Local Search Ranking */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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