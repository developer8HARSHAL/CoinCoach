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
        permanent: true, // Permanent 301 redirect
      },
    ];
  },
};

export default nextConfig;
