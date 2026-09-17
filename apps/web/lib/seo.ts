import type { Metadata } from 'next';

export const SITE_URL = 'https://mavoratechnologies.com';
export const SITE_NAME = 'Mavora Technologies';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export interface ServiceSEOProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

/**
 * Generates standardized Next.js App Router Metadata for service pages.
 */
export function createServiceMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
}: ServiceSEOProps): Metadata {
  const canonicalUrl = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_KE',
      url: canonicalUrl,
      title: `${title} | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_NAME} Kenya`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Generates Schema.org Service JSON-LD for service pages.
 */
export function generateServiceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: {
      '@type': 'Organization',
      name: 'Mavora Technologies Ltd',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Kenya',
    },
  };
}