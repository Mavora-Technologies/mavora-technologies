import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Disables server-side image optimization
  },
  // ... retain any other existing configuration settings
};

export default nextConfig;