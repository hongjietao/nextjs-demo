/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img1.doubanio.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img2.doubanio.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img9.doubanio.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
