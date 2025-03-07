/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig; 