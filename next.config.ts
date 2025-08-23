/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'assets.aceternity.com'],
  },
  eslint: {
    // Ne bloque PAS le build en cas d'erreurs eslint
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/portfolio',
        destination: '/chat?query=What%20are%20your%20projects%3F%20What%20are%20you%20working%20on%20right%20now%3F',
        permanent: false, // Temporary redirect (307)
      },
    ];
  },
};

module.exports = nextConfig;
