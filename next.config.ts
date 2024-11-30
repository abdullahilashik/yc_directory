import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com'
      },
      {
        protocol: 'https',
        hostname: 'placeholder.co'
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      }
    ]
  }
};

export default nextConfig;
