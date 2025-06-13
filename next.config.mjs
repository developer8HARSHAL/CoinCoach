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
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
  },
  // Handle build warnings
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;