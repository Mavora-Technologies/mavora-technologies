// apps/web/next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Keep this if you want unoptimized images, or remove it if using Vercel Image Optimization
  },
};

export default nextConfig;