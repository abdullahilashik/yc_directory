import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental:{
    after: true
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '0.gravatar.com'
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
