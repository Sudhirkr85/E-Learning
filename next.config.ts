import type { NextConfig } from "next";
import { loadEnvConfig } from '@next/env';

// Load environment variables from .env file
loadEnvConfig(process.cwd());

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },
};

export default nextConfig;
