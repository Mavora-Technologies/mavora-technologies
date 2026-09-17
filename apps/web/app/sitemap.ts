import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mavoratechnologies.com';
  const currentDate = new Date().toISOString();

  const routes = [
    '',
    '/about',
    '/contact',
    '/request-project',
    '/services',
    '/services/ai-automation',
    '/services/software-development',
    '/services/web-development',
    '/services/mobile-development',
    '/services/cybersecurity',
    '/services/cloud-it',
    '/services/data-analytics',
    '/services/digital-transformation',
    '/industries',
    '/projects',
    '/insights',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route.startsWith('/services/') ? 0.8 : 0.6,
  }));
}