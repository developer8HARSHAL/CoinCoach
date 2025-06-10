/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  async redirects() {
    return [
      {
        source: '/below-eighteen',
        destination: '/course',
        permanent: true,
      },
    ];
  },
  // Handle environment variables properly
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Optimize for production
  // swcMinify: true,
  // Suppress hydration warnings in development
  reactStrictMode: true,
  // Handle potential build issues
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;